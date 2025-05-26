import { useNavigate } from "react-router-dom";

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";

const LessonView = () => {

    const navigate = useNavigate();

     return(
        <ReactBootstrapComponents.Screen title="Aula">
            <ReactBootstrapComponents.Button text="Voltar" onClick={() => navigate('/student-home')} variant="secondary"/>
        </ReactBootstrapComponents.Screen>
    );
}

export default LessonView;