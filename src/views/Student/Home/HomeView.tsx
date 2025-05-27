import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";
import { BootstrapColors } from "../../../constants/Colors";
import { useGlobal } from "../../../context/GlobalContext";
import Aluno from "../../../models/AlunoModel";

const HomeView = () => {

    const [aluno,setAluno] = useState<Aluno|null>(null);
    const [aulas, setAulas] = useState([
        {
            id: 1,
            tx_descricao: "Aula 1"
        }
    ]);

    const navigate = useNavigate();
    const { setUser } = useGlobal();

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
                <div>OK</div>
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