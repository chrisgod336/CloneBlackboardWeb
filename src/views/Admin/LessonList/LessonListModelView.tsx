import Swal from "sweetalert2";

import Aula from "../../../models/AulaModel";
import { BootstrapColors } from "../../../constants/Colors";

export const getAll = async () => {
    try{

        const response:any = await Aula.getAll();

        if(response.success){
            return{
                success:true,
                data:response.data
            }
        }else{
            throw new Error(response.message??'Erro desconhecido');
        }

    }catch(error:any){
        Swal.fire({
            title: "Erro!",
            text: 'Erro ao tentar buscar aulas.',
            icon: 'error',
            confirmButtonColor: BootstrapColors.primary,
        })
        console.error(error);
        return {
            success: false
        }
    }
}