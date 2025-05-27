import Swal from "sweetalert2"

import Aluno from "../../../models/AlunoModel"
import { BootstrapColors } from "../../../constants/Colors";

export const get = async(
    id: number
) => {
        try{

        const response:any = await Aluno.get(
            id
        );

        if(response.success){
            return {
                success: true,
                data: response.data
            }
        }else{
            throw new Error(response.message||'Erro desconhecido.');
        }

    }catch(error:any){
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Erro ao tentar buscar os dados da sua conta.',
            confirmButtonColor: BootstrapColors.primary
        });
        return {
            success: false
        }
    }
}
