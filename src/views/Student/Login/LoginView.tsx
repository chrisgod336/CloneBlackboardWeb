import { useNavigate } from "react-router-dom";

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";

const LoginView = () => {

    const navigate = useNavigate();

    return(
        <ReactBootstrapComponents.Screen title="Entrar como Aluno">
            <ReactBootstrapComponents.Form inputs={[
                {
                    type: "text",
                    name: "login",
                    id: "login",
                    label: "Login",
                    placeholder: "Digite seu login",
                },
                {
                    type: "password",
                    name: "password",
                    id: "password",
                    label: "Senha",
                    placeholder: "Digite sua senha",
                }
            ]}
            buttons={[
                {
                    position: "bottom",
                    align: "right",
                    elements: [
                        <ReactBootstrapComponents.Button text="Entrar" onClick={() => navigate('/student-home')}/>
                    ]
                },
                {
                    position: "top",
                    align: "left",
                    elements: [
                        <ReactBootstrapComponents.Button text="Voltar" variant="secondary" onClick={() => navigate('/')}/>
                    ]
                }
            ]}
            />
        </ReactBootstrapComponents.Screen>
    );
}

export default LoginView;