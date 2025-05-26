import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";
import { getAll } from "./LessonListModelView";
import { faBookOpen, faEye, faArrowLeftLong, faPlus } from "@fortawesome/free-solid-svg-icons";
import { BootstrapColors } from "../../../constants/Colors";

const LessoListView = () => {

    const [aulas, setAulas] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await getAll()
            .then((res) => {
                if(res.success){
                    setAulas(res.data);
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
                <h6>Carregando Aulas...</h6>
                <ReactBootstrapComponents.Spinner variant="primary" size={"lg"}/>
            </div>
        )
    }

        return(
        <ReactBootstrapComponents.Screen title="Aulas">
            <ReactBootstrapComponents.Table
                bordered={false}
                striped={false}
                emptyMessage="Nenhuma aula encontrada."
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
                        field: 'id',
                        render: (element) => (
                            <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '50px'}}>
                                <ReactBootstrapComponents.Button
                                    icon={
                                        <ReactBootstrapComponents.Icon name={faEye} size="1x" color={BootstrapColors.primary}/>
                                    }
                                    variant="link"
                                    onClick={() => navigate(`/admin-lesson?id=${element}`)}
                                />
                            </div>
                        ) 
                    }
                ]}
                data={aulas}
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
                                    onClick={() => navigate('/admin-lesson')}
                                    variant="success"
                                    icon={<ReactBootstrapComponents.Icon
                                    name={faPlus}
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

export default LessoListView;