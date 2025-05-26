import { useNavigate } from 'react-router-dom';
import { faGraduationCap, faChalkboardUser } from '@fortawesome/free-solid-svg-icons';

import { ReactBootstrapComponents } from "../utils/Bootstrap";

const LandingPageView = () => {

    const navigate = useNavigate();

    return(
        <ReactBootstrapComponents.Screen title="Bem vindo(a)!">
            <div style={{
                display:'flex', 
                flexDirection:'row', 
                gap: 20, 
                justifyContent: 'center', 
                alignItems: 'center'
            }}>
                <ReactBootstrapComponents.Card variant="primary" width={'50%'} height={'500px'} onClick={() => navigate('/admin')}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}>
                        <ReactBootstrapComponents.Icon name={faChalkboardUser} size='5x' color='#ffff'/>
                        <h4>Entrar como Professor</h4>
                    </div>
                </ReactBootstrapComponents.Card>
                <ReactBootstrapComponents.Card variant="primary" width={'50%'} height={'500px'} onClick={() => navigate('/student')}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}>
                        <ReactBootstrapComponents.Icon name={faGraduationCap} size='5x' color='#ffff'/>
                        <h4>Entrar como Aluno</h4>
                    </div>
                </ReactBootstrapComponents.Card>
            </div>
        </ReactBootstrapComponents.Screen>
    )
}

export default LandingPageView;