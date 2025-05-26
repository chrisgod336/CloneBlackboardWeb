import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { faArrowLeftLong, faUserPlus, faPlus, faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";
import { post, get, put, del } from "./StudentModelView";
import { BootstrapColors } from "../../../constants/Colors";
import { ColorChoiser } from "../../../utils/ProjectLibs/colorChoiser";
import Aluno from "../../../models/AlunoModel";
import { PieChart } from "../../../utils/ApexCharts";

const StudentView = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submiting, setSubmiting] = useState(false);

    const id = Number(searchParams.get("id"));
    const [nome, setNome] = useState("");
    const [login, setLogin] = useState("");
    const [aluno, setAluno] = useState<Aluno|null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if(id){
                setLoading(true);
                await get(id)
                .then((res) => {
                    if(res?.success){
                        const newAluno = res.data;
                        setAluno(newAluno);
                        setNome(newAluno.getTxNome());
                        setLogin(newAluno.getTxLogin());
                    }
                })
                .finally(() => setLoading(false));
            }
        }

        fetchData();
    },[id]);

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
                <h6>Carregando Dados do Aluno...</h6>
                <ReactBootstrapComponents.Spinner variant="primary" size={"lg"}/>
            </div>
        )
    }

     return(
        <ReactBootstrapComponents.Screen title="Visualização de Aluno">
           <div style={{marginBottom: 20}}>
               <ReactBootstrapComponents.Button
                text="Voltar"
                onClick={() => navigate('/admin-student-list')}
                variant="secondary"
                icon={<ReactBootstrapComponents.Icon
                name={faArrowLeftLong}
                color='#fff'
                size="sm"
                />}
            />
           </div>
            <ReactBootstrapComponents.Accordion title="Dados do Aluno" isOpen={true}>
                <ReactBootstrapComponents.Form
                    inputs={[
                        {
                            type:'text',
                            name:'tx_nome',
                            label: 'Nome *',
                            value: nome,
                            onChange: (e) => setNome(e.target.value)
                        },
                        {
                            type:'text',
                            name:'tx_login',
                            label: 'Login *',
                            value: login,
                            onChange: (e) => setLogin(e.target.value)
                        }
                    ]}
                    buttons={[
                        {
                            position: 'top',
                            align: 'right',
                            elements: 
                            id?
                            [
                                <ReactBootstrapComponents.Button
                                    disabled={submiting}
                                    text="Novo"
                                    onClick={( ) => {
                                        setNome('');
                                        setLogin('');
                                        setAluno(null)
                                        navigate('/admin-student')
                                    }}
                                    variant="success"
                                    icon={
                                    submiting?
                                    <ReactBootstrapComponents.Spinner/>
                                    :
                                    <ReactBootstrapComponents.Icon
                                    name={faPlus}
                                    color='#fff'
                                    size="sm"
                                    />
                                    }
                                />,
                                <ReactBootstrapComponents.Button
                                    disabled={submiting}
                                    text="Salvar"
                                    onClick={async ( ) => {
                                        if(!aluno){
                                            return false;
                                        }
                                        setSubmiting(true);
                                        await put(
                                            aluno,
                                            nome,
                                            login
                                        ).finally(() => setSubmiting(false));
                                    }}
                                    variant="primary"
                                    icon={
                                    submiting?
                                    <ReactBootstrapComponents.Spinner/>
                                    :
                                    <ReactBootstrapComponents.Icon
                                    name={faFloppyDisk}
                                    color='#fff'
                                    size="sm"
                                    />
                                    }
                                />,
                                  <ReactBootstrapComponents.Button
                                    disabled={submiting}
                                    text="Excluir"
                                    onClick={async ( ) => {
                                        if(!aluno){
                                            return false;
                                        }
                                        setSubmiting(true);
                                        await del(aluno)
                                        .then(() => {
                                            
                                            Swal.fire({
                                                title: 'Aviso!',
                                                text: 'Você tem certeza que deseja excluir o aluno?',
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: BootstrapColors.success,
                                                cancelButtonColor: BootstrapColors.danger,
                                                confirmButtonText: 'Sim',
                                                cancelButtonText: 'Não'
                                            }).then(async (res) => {
                                                if(res.isConfirmed){
                                                    setAluno(null);
                                                    Swal.fire({
                                                        title: 'Sucesso!',
                                                        text: 'Aluno excluído com sucesso.',
                                                        icon: 'success',
                                                        confirmButtonColor: BootstrapColors.primary
                                                    })
                                                    .then(() => {
                                                        navigate('/admin-student-list')
                                                    })
                                                }
                                            });
                                        })
                                        .finally(() => setSubmiting(false));
                                    }}
                                    variant="danger"
                                    icon={
                                    submiting?
                                    <ReactBootstrapComponents.Spinner/>
                                    :
                                    <ReactBootstrapComponents.Icon
                                    name={faTrash}
                                    color='#fff'
                                    size="sm"
                                    />
                                    }
                                />
                            ]
                            :
                            [
                                <ReactBootstrapComponents.Button
                                    disabled={submiting}
                                    text="Incluir"
                                    onClick={async () => {
                                        setSubmiting(true);
                                        await post(nome, login)
                                        .then((res) => {
                                            const id = res?.data?.id;
                                            if(res?.success && id){
                                                navigate(`/admin-student?id=${id}`)
                                            }
                                        })
                                        .finally(() => setSubmiting(false))
                                    }}
                                    variant="success"
                                    icon={
                                    submiting?
                                    <ReactBootstrapComponents.Spinner/>
                                    :
                                    <ReactBootstrapComponents.Icon
                                    name={faUserPlus}
                                    color='#fff'
                                    size="sm"
                                    />
                                    }
                                />
                            ]
                        }
                    ]}
                />
                <div style={{display: id?'flex':'none'}}>
                    <div style={{width: '50%'}}>
                        <div><b>Nível de aprendizado</b></div>
                        {aluno&&<ReactBootstrapComponents.Alert text={aluno.getTxNivel().toUpperCase()} variant={ColorChoiser.nivelVariant(aluno.getTxNivel())}/>}
                    </div>
                     <div style={{width: '50%'}}>
                        <div><b>Senha</b></div>
                        <div>senha1234</div>
                    </div>
                </div>
            </ReactBootstrapComponents.Accordion><br/>
            {
                id?
                <ReactBootstrapComponents.Accordion title="Detalhes" >
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
                :null
            }
        </ReactBootstrapComponents.Screen>
    );
}

export default StudentView;