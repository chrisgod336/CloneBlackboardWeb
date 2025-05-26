import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faArrowLeftLong, faArrowRightToBracket, faChalkboardUser } from "@fortawesome/free-solid-svg-icons";

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";
import { get } from "./LoginModelView";
import { useGlobal } from "../../../context/GlobalContext";
import { BootstrapColor, BootstrapColors } from "../../../constants/Colors";

const LoginView = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setUser } = useGlobal();

    return(
        <ReactBootstrapComponents.Screen title="">
            <ReactBootstrapComponents.Button 
                variant="secondary"
                icon={<ReactBootstrapComponents.Icon 
                    name={faArrowLeftLong} 
                    size="sm" 
                    color="#fff"
                    />}
                text="Voltar"
                onClick={() => navigate('/')}
            />
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <ReactBootstrapComponents.Card width={'50%'}>
                    <h3 style={{
                        textAlign: 'center', 
                        margin:20
                        }}>
                            Entrar como Professor
                        </h3>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 30
                        }}>
                        <ReactBootstrapComponents.Icon name={faChalkboardUser} size="7x" color={BootstrapColors.primary}/>
                    </div>
                    <ReactBootstrapComponents.Form inputs={[
                        {
                            type: "text",
                            name: "login",
                            id: "login",
                            label: "Login *",
                            placeholder: "Digite seu login",
                            value: login,
                            onChange: (e) => {setLogin(e.target.value)}
                        },
                        {
                            type: "password",
                            name: "password",
                            id: "password",
                            label: "Senha *",
                            placeholder: "Digite sua senha",
                            value: password,
                            onChange: (e) => setPassword(e.target.value)
                        }
                    ]}
                    buttons={[
                        {
                            position: "bottom",
                            align: "right",
                            elements: [
                                <ReactBootstrapComponents.Button 
                                    text="Entrar" 
                                    onClick={async() =>{
                                        setLoading(true);
                                        await get(login, password)
                                        .then((res) => {
                                            if(res.success){
                                                setUser(res.data);
                                                navigate('/admin-home');
                                            }
                                        })
                                        .finally(() => setLoading(false));
                                    }}
                                    icon={
                                    loading?
                                    <ReactBootstrapComponents.Spinner/>
                                    :
                                    <ReactBootstrapComponents.Icon
                                    name={faArrowRightToBracket}
                                    color="#fff"
                                    size="sm"
                                    />}
                                />
                            ]
                        }
                    ]}
                    />
                </ReactBootstrapComponents.Card>
            </div>
        </ReactBootstrapComponents.Screen>
    );
}

export default LoginView;