import Swal from "sweetalert2"

import Aluno from "../../../models/AlunoModel"
import Aula from "../../../models/AulaModel";
import AulaAluno from "../../../models/AulaAlunoModel";
import { BootstrapColors } from "../../../constants/Colors";

// export const get = async(
//     id: number
// ) => {
//         try{

//         const response:any = await Aluno.get(
//             id
//         );

//         if(response.success){
//             return {
//                 success: true,
//                 data: response.data
//             }
//         }else{
//             throw new Error(response.message||'Erro desconhecido.');
//         }

//     }catch(error:any){
//         console.error(error);
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops',
//             text: 'Erro ao tentar buscar os dados da sua conta.',
//             confirmButtonColor: BootstrapColors.primary
//         });
//         return {
//             success: false
//         }
//     }
// }

export const getAll = async(
    id_aluno: number
) => {
        try{

        const response:any = await Aula.getAll();

        if(response.success){

            let alunoAulas = [];

            for(const aula of response.data){
                const res:any = await AulaAluno.get(id_aluno, aula?.getId());
                
                if(res?.success){
                    const aulaAluno:AulaAluno = res?.data;
                    const lo_finalizado:string = aulaAluno?.getLoFinalizado()

                    alunoAulas.push({...aula, lo_finalizado: lo_finalizado});
                }else{
                    alunoAulas.push({...aula, lo_finalizado: 'N'});
                }
            }

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
            text: 'Erro ao tentar buscar as aulas do aluno.',
            confirmButtonColor: BootstrapColors.primary
        });
        return {
            success: false
        }
    }
}