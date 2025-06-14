import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { faDoorOpen, faBookOpen, faEye, faCircleCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";
import { BootstrapColors } from "../../../constants/Colors";
import { useGlobal } from "../../../context/GlobalContext";
import Aluno from "../../../models/AlunoModel";
import { getAll, get } from "./HomeModelView";
import { ColorChoiser } from "../../../utils/ProjectLibs/colorChoiser";
import { PieChart } from "../../../utils/ApexCharts";

const HomeView = () => {

    const [aulas, setAulas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [aluno, setAluno] = useState<Aluno|undefined>();
    const [searchParams, setSearchParams] = useSearchParams();
    const id_aluno = Number(searchParams.get("id_aluno"))||0;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            if(!id_aluno){
                navigate("/");
            }

            const res:any = await get(id_aluno);

            if(res?.success){
                setAluno(res?.data);
            }

            const response:any = await getAll(id_aluno);

            if(response?.success){
                setAulas(response?.data);
            }
        }

        fetchData().then(() => {
            setLoading(false);
        })
    },[]);

    
    if(loading){
        return(
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                flexDirection: 'column'
            }}>
                <h6>Carregando Painel do Aluno...</h6>
                <ReactBootstrapComponents.Spinner variant="primary" size={"lg"}/>
            </div>
        )
    }

     return(
        <ReactBootstrapComponents.Screen title="Painel do Aluno">
            <ReactBootstrapComponents.Button
                text="Sair"
                variant="danger"
                onClick={() => {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Aviso!',
                        text: 'Deseja sair do sistema?',
                        showCancelButton: true,
                        confirmButtonText: 'Sim',
                        cancelButtonText: 'Não',
                        confirmButtonColor: BootstrapColors.success,
                        cancelButtonColor: BootstrapColors.danger
                    })
                    .then((res) => {
                        if (res.isConfirmed) {
                            navigate('/');
                        }
                    })
                }}
                icon={
                    <ReactBootstrapComponents.Icon
                    name={faDoorOpen}
                    />
                }
            />
            <br/><br/>
            <ReactBootstrapComponents.Accordion title="Meus Dados" isOpen={true}>
                <ReactBootstrapComponents.Alert 
                    text={aluno?.getFeedback() as string} 
                    variant={ColorChoiser.nivelVariant(aluno?.getTxNivel() as string)}
                    style={{
                        textAlign: 'center',
                        padding: '2rem',
                    }}
                    />
                    <h4 style={{marginTop: 20, marginBottom: 20}}>Acertos/Erros por tipo de Questão</h4>
                    <div style={{display: 'flex', gap:15, flexWrap: 'wrap', justifyContent: 'center'}}>
                        <ReactBootstrapComponents.Card>
                            <PieChart
                            title="Texto"
                            data={[
                                {
                                label: 'Acertos',
                                value: Number(aluno?.getNuAcertosTexto() || 0.0001)
                                },
                                {
                                label: 'Erros',
                                value: Number(aluno?.getNuErrosTexto() || 0.0001)
                                }
                            ]}
                            width="100%"
                            height={300}
                            colors={[
                                BootstrapColors.success,
                                BootstrapColors.danger
                            ]}
                            />
                        </ReactBootstrapComponents.Card>
                        
                        <ReactBootstrapComponents.Card>
                            <PieChart
                            title="Imagem"
                            data={[
                                {
                                label: 'Acertos',
                                value: Number(aluno?.getNuAcertosImagem() || 0.0001)
                                },
                                {
                                label: 'Erros',
                                value: Number(aluno?.getNuErrosImagem() || 0.0001)
                                }
                            ]}
                            width="100%"
                            height={300}
                            colors={[
                                BootstrapColors.success,
                                BootstrapColors.danger
                            ]}
                            />
                        </ReactBootstrapComponents.Card>
                        
                        <ReactBootstrapComponents.Card>
                            <PieChart
                            title="Vídeo"
                            data={[
                                {
                                label: 'Acertos',
                                value: Number(aluno?.getNuAcertosVideo() || 0.0001)
                                },
                                {
                                label: 'Erros',
                                value: Number(aluno?.getNuErrosVideo() || 0.0001)
                                }
                            ]}
                            width="100%"
                            height={300}
                            colors={[
                                BootstrapColors.success,
                                BootstrapColors.danger
                            ]}
                            />
                        </ReactBootstrapComponents.Card>
                        </div>
            </ReactBootstrapComponents.Accordion>
            <br/>
            <ReactBootstrapComponents.Accordion title="Minhas Aulas" isOpen={true}>
                <ReactBootstrapComponents.Table
                    data={aulas}
                    striped={false}
                    bordered={false}
                    columns={[
                        {
                            label: '',
                            field: 'id',
                            render: () => (
                                <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '50px', width: 10}}>
                                    <ReactBootstrapComponents.Icon
                                    name={faBookOpen}
                                    size="xl"
                                    color={BootstrapColors.secondary}
                                    />
                                </div>
                            )
                        },
                        {
                            label: '',
                            field: 'tx_descricao',
                            render: (element) => (
                                <div style={{
                                    display: 'flex', 
                                    justifyContent: 'flex-start', 
                                    alignItems: 'center', 
                                    height: '50px'
                                }}>
                                    {element}
                                </div>
                            )
                        },
                        {
                            label: '',
                            field: 'lo_finalizado',
                            render: (element) => (
                                 <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '50px'}}>
                                    {
                                        element === 'S' ?
                                        <ReactBootstrapComponents.Icon
                                        name={faCircleCheck}
                                        size="1x"
                                        color={BootstrapColors.success}
                                        />
                                        :
                                        <ReactBootstrapComponents.Icon
                                        name={faCircleExclamation}
                                        size="1x"
                                        color={BootstrapColors.danger}
                                        />
                                    }
                                    {
                                        element == 'S' ?
                                        <b style={{color: BootstrapColors.success, marginLeft: 5}}>Concluída</b>
                                        :
                                        <b style={{color: BootstrapColors.danger, marginLeft: 5}}>Pendente</b>
                                    }
                                </div>
                            )
                        },
                        {
                            label: '',
                            field: 'id',
                            render: (element) => (
                                <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '50px'}}>
                                    <ReactBootstrapComponents.Button
                                        icon={
                                            <ReactBootstrapComponents.Icon name={faEye} size="1x" color={BootstrapColors.primary}/>
                                        }
                                        variant="link"
                                        onClick={() =>navigate(`/student-lesson?id_aula=${element}&id_aluno=${id_aluno}`)}
                                    />
                                </div>
                            ) 
                        }
                    ]}
                />
            </ReactBootstrapComponents.Accordion>
        </ReactBootstrapComponents.Screen>
    );
}

export default HomeView;