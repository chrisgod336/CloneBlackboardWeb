import Aluno from "../../../models/AlunoModel";

import Swal from "sweetalert2";
import { BootstrapColors } from "../../../constants/Colors";

export const getAll = async() => {
    try{

        const response:any = await Aluno.getAll();

        if(response.success){
            return {
                success: true,
                data: response.data
            }
        }else{
            throw new Error(response?.message??'Erro desconhecido.');
        }

    }catch(error){
        console.error(error);
        Swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um erro ao tentar buscar os alunos.',
            icon: 'error',
            confirmButtonColor: BootstrapColors.primary
        });
        return {
            success: false
        }
    }
}