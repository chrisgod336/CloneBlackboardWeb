import Swal from "sweetalert2"

import AulaAluno from "../../../models/AulaAlunoModel";
import Aula from "../../../models/AulaModel";
import AulaParte from "../../../models/AulaParteModel";
import AulaQuestao from "../../../models/AulaQuestaoModel";
import { BootstrapColors } from "../../../constants/Colors";
import { jsonManipulator } from "../../../utils/ProjectLibs/jsonManipulator";

export const getAll = async (
    id_aula:number
) => {
    try{
        const response_aula:any = await Aula.get(id_aula);

        if(response_aula.success){

            const aula = response_aula?.data;

            const response_parts:any = await AulaParte.getAll(id_aula);

            if(response_parts?.success){

                const parts:Array<any> = response_parts?.data;

                const part1 = {
                    tx_texto: parts[0]?.getTxTexto(),
                    tx_dir_img: parts[0]?.getTxDirImagem(),
                    tx_url_video: parts[0]?.getTxUrlVideo()
                }

                const part2 = {
                    tx_texto: parts[1]?.getTxTexto(),
                    tx_dir_img: parts[1]?.getTxDirImagem(),
                    tx_url_video: parts[1]?.getTxUrlVideo()
                }

                const part3 = {
                    tx_texto: parts[2]?.getTxTexto(),
                    tx_dir_img: parts[2]?.getTxDirImagem(),
                    tx_url_video: parts[2]?.getTxUrlVideo()
                }

                const response_questions:any = await AulaQuestao.getAll(id_aula);

                if(response_questions?.success){

                        const questoes:any = response_questions?.data?.map((element:any, index:number) => {

                            const tx_pergunta = element?.getTxDescricao();
                            const id_resposta = element?.getIdResposta();
                            const alternativas = jsonManipulator.parseStringToArray(element?.tx_alternativas);

                            return {
                                id: index,
                                tx_descricao: tx_pergunta,
                                id_resposta: id_resposta,
                                alternativas: {
                                    tx_resposta1: alternativas[0].label,
                                    tx_resposta2: alternativas[1].label,
                                    tx_resposta3: alternativas[2].label,
                                    tx_resposta4: alternativas[3].label,
                                    tx_resposta5: alternativas[4].label
                                }
                            }
                        });

                        return{
                            success: true,
                            data: {
                                aula: aula,
                                part1: part1,
                                part2: part2,
                                part3: part3,
                                questoes: questoes ,
                                partes_obj: parts,
                                questoes_obj: response_questions?.data
                            }
                        }
                }else{
                    throw new Error(response_questions?.message??'Erro ao tentar buscar as questões da aula.');
                }


            }else{
                throw new Error(response_parts?.message??'Erro ao tentar buscar partes da aula.');
            }

        }else{
            throw new Error(response_aula?.message??'Erro ao tentar buscar dados da aula.');
        }

    }catch(error:any){
        console.error(error);
        Swal.fire({
            title: 'Erro!',
            text: 'Erro ao tentar buscar dados da aula.',
            icon: 'error',
            confirmButtonColor: BootstrapColors.primary
        })
        return {
            success: false
        }
    }
}

export const get = async (
    id_aluno: number,
    id_aula: number
):Promise<object> => {
    try{

        const response:any = await AulaAluno.get(
            id_aluno, 
            id_aula
        );

        if(response?.success){
            return {
                success: true,
                message: 'Dados da aula do aluno encontrados com sucesso',
                data: response?.data
            }
        }else{
            return {
                success: false
            }
        }

    }catch(error:any){
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Erro!",
            text: error?.message??"Erro ao tentar buscar os dados da aula do aluno.",
        })
        return {
            success: false
        }
    }
}

export const make = async (
    id_aluno: number
):Promise<object> => {
    try{

        const response:any= await AulaAluno.make(id_aluno);

        if(response?.success){
             return {
                success: true,
                message: response?.message??'Aula do aluno montada com sucesso.',
                data: response?.data
            }
        }else{
            throw new Error(response?.message??'Erro ao montar aula do aluno.');
        }

       
    }catch(error:any){
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Erro!",
            text: error?.message??"Erro ao tentar montar a aula do aluno.",
        })
        return {
            success: false
        }
    }
}