import { useNavigate } from "react-router-dom";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { BootstrapColors } from "../../../constants/Colors";

export const LessonForm = (
    description:string,
    setDescription:(values:string) => void
) => {

    const navigate = useNavigate();

    return(
        <ReactBootstrapComponents.Screen title="Dados da Aula">
            <ReactBootstrapComponents.Button
                text="Voltar"
                variant="secondary"
                onClick={() => navigate('/admin-lesson-list')}
                icon={
                    <ReactBootstrapComponents.Icon name={faArrowLeftLong} />
                }
            />
            <center style={{margin: 30}}>
                <ReactBootstrapComponents.Icon
                name={faBook}
                color={BootstrapColors.primary}
                size="5x"
                />
            </center>
            <ReactBootstrapComponents.Form
            inputs={
                [
                    {
                        label: "Nome da Aula *",
                        name: "tx_description",
                        type: "text",
                        placeholder: "Insira o nome da aula",
                        id: "tx_description",
                        value: description,
                        onChange: (e) => setDescription(e.target.value)
                    }
                ]
            }
            />
        </ReactBootstrapComponents.Screen>
    );
}