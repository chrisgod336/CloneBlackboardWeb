import Swal from 'sweetalert2';

import Admin from "../../../models/AdminModel";
import { BootstrapColor, BootstrapColors } from '../../../constants/Colors';

export const get = async (
    tx_login:string,
    tx_senha:string
) => {
    try {

        const response:any = await Admin.get(
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