import Swal from 'sweetalert2';

import Aluno from "../../../models/AlunoModel";
import { BootstrapColors } from '../../../constants/Colors';

export const login = async (
    tx_login:string,
    tx_senha:string
) => {
    try {

        const response:any = await Aluno.login(
            tx_login,
            tx_senha
        );

        if(response?.success){
            return {
                success: true,
                data: response.data
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Opsss',
                text: 'Login ou senha incorretos.',
                confirmButtonColor: BootstrapColors.primary
            });
            return {
                success: false
            }
        }

    }catch(error:any){
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Opsss',
            text: 'Erro ao realizar login.',
            confirmButtonColor: BootstrapColors.primary
        });
        return {
            success: false
        }
    }
}