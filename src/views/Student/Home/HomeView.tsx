import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";

const HomeView = () => {

    const [aulas, setAulas] = useState([
        {
            id: 1,
            tx_descricao: "Aula 1"
        }
    ]);

    const navigate = useNavigate();

     return(
        <ReactBootstrapComponents.Screen title="Painel do Aluno">
            <ReactBootstrapComponents.Button
                text="Deslogar"
                variant="secondary"
                onClick={() => navigate('/')}
            />
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
        </ReactBootstrapComponents.Screen>
    );
}

export default HomeView;