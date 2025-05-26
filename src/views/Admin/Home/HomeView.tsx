import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../../../context/GlobalContext';
import Swal from 'sweetalert2';
import { faDoorOpen, faBookOpen, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";
import { BootstrapColor, BootstrapColors } from '../../../constants/Colors';

const HomeView = () => {

    const navigate = useNavigate();
    const { setUser } = useGlobal(); 

    return(
        <ReactBootstrapComponents.Screen title="Painel do Professor">
            <ReactBootstrapComponents.Button
                text="Sair"
                variant="danger"
                 icon={<ReactBootstrapComponents.Icon 
                name={faDoorOpen} 
                size="sm" 
                color="#fff"
                />}
                onClick={() => {
                    Swal.fire({
                        title: 'Aviso!',
                        text: 'Deseja sair do sistema?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Sim',
                        confirmButtonColor: BootstrapColors.success,
                        cancelButtonText: 'Não',
                        cancelButtonColor: BootstrapColors.danger
                    }).then((res) => {
                        if(res.isConfirmed){
                            setUser(null);
                            navigate('/');
                        }
                    })
                }}
            />
            <div style={{
                display:'flex', 
                flexDirection:'row', 
                gap: 20, 
                justifyContent: 'center', 
                alignItems: 'center',
                width: '100%',
                marginTop: 20 
                }}>
                <ReactBootstrapComponents.Card variant="primary" width={'50%'} height={'450px'} onClick={() => navigate('/admin-lesson-list')}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}>
                        <ReactBootstrapComponents.Icon name={faBookOpen} size='5x' color='#ffff'/>
                        <h4>Aulas</h4>
                    </div>
                </ReactBootstrapComponents.Card>
                <ReactBootstrapComponents.Card variant="primary" width={'50%'} height={'450px'} onClick={() => navigate('/admin-student-list')}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}>
                        <ReactBootstrapComponents.Icon name={faGraduationCap} size='5x' color='#ffff'/>
                        <h4>Alunos</h4>
                    </div>
                </ReactBootstrapComponents.Card>
            </div>
        </ReactBootstrapComponents.Screen>
    )
}

export default HomeView;