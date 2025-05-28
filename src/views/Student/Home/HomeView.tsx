import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faDoorOpen, faArrowLeftLong, faUserPlus, faPlus, faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";
import { BootstrapColors } from "../../../constants/Colors";
import { useGlobal } from "../../../context/GlobalContext";
import Aluno from "../../../models/AlunoModel";
import { getAll } from "./HomeModelView";
import { ColorChoiser } from "../../../utils/ProjectLibs/colorChoiser";
import { PieChart } from "../../../utils/ApexCharts";

const HomeView = () => {

    const { state } = useGlobal();
    const aluno:Aluno = state.user as Aluno;
    const [aulas, setAulas] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setUser } = useGlobal();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await getAll(aluno?.getId());

            if(response?.success){
                setAulas(response?.data);
            }
        }

        fetchData().then(() => {
            setLoading(false);
        })
    },[]);

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
                            setUser(null);
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
                                render: (_, row) => (
                                    <ReactBootstrapComponents.Button variant="outline-primary" size="sm" onClick={() => navigate('/student-lesson')} text="Visualizar"/>
                                )

                        },
                        {
                            label: '',
                            field: 'tx_descricao'
                        }
                    ]}
                />
            </ReactBootstrapComponents.Accordion>
        </ReactBootstrapComponents.Screen>
    );
}

export default HomeView;