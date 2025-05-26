import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faEye, faArrowLeftLong, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";
import { getAll } from "./StudentListModelView";
import { BootstrapColors } from "../../../constants/Colors";
import { ColorChoiser } from "../../../utils/ProjectLibs/colorChoiser";

const StudentListView = () => {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await getAll()
            .then((res) => {
                if(res.success){
                    setStudents(res.data);
                }
            })
            .finally(() => {
                setLoading(false);
            })
        }

        fetchData();
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
                <h6>Carregando Alunos...</h6>
                <ReactBootstrapComponents.Spinner variant="primary" size={"lg"}/>
            </div>
        )
    }

     return(
        <ReactBootstrapComponents.Screen title="Alunos">
            <ReactBootstrapComponents.Table
                bordered={false}
                striped={false}
                emptyMessage="Nenhum aluno encontrado."
                columns={[
                    {
                        label: 'Nome',
                        field: 'tx_nome',
                        render: (element) => (
                            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '50px'}}>
                                {element}
                            </div>
                        )
                    },
                    {
                        label: 'Nível de aprendizado',
                        field: 'tx_nivel',
                        render: (element) => (
                            <div style={{
                            display: 'flex', 
                            justifyContent: 'flex-start', 
                            alignItems: 'center', 
                            height: '50px'
                            }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <ReactBootstrapComponents.Alert 
                                variant={ColorChoiser.nivelVariant(element)} 
                                style={{
                                    margin: 0,
                                    padding: '0.25rem 0.5rem',
                                    width: 'fit-content',
                                    minWidth: '100px',
                                    textAlign: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '40px'
                                }}
                                text={element.toUpperCase()}
                                />
                            </div>
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
                                    onClick={() => navigate(`/admin-student?id=${element}`)}
                                />
                            </div>
                        ) 
                    }
                ]}
                data={students}
                tableButtons={[
                    {
                        align: 'start',
                        position: 'top',
                        buttons: [
                                <ReactBootstrapComponents.Button
                                    text="Voltar"
                                    onClick={() => navigate('/admin-home')}
                                    variant="secondary"
                                    icon={<ReactBootstrapComponents.Icon
                                    name={faArrowLeftLong}
                                    color='#fff'
                                    size="sm"
                                    />}
                                />
                        ]
                    },
                    {
                        align: 'end',
                        position: 'top',
                        buttons: [
                            <ReactBootstrapComponents.Button
                                    text="Novo"
                                    onClick={() => navigate('/admin-student')}
                                    variant="success"
                                    icon={<ReactBootstrapComponents.Icon
                                    name={faUserPlus}
                                    color='#fff'
                                    size="sm"
                                    />}
                                />
                        ]
                    }
                ]}
            />
        </ReactBootstrapComponents.Screen>
    );
}

export default StudentListView;