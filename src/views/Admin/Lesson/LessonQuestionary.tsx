import { faPlus, faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";
import { LessonQuestion } from "./LessonQuestion";
import Aula from "../../../models/AulaModel";
import AulaParte from "../../../models/AulaParteModel";
import AulaQuestao from "../../../models/AulaQuestaoModel";
import { BootstrapColors } from "../../../constants/Colors";

interface LessonQuestionary {
    description:string,
    part1:any,
    part2:any,
    part3:any,
    questions:any,
    setQuestions:any,
    id_questao:number,
    aula:any
}

export const LessonQuestionary = ({
    description,
    part1,
    part2,
    part3,
    questions,
    setQuestions,
    id_questao,
    aula
}:LessonQuestionary) => {

    const navigate = useNavigate();
    const [submiting, setSubmiting] = useState(false);

    const hadleQuestions = () => {
        let quest:Array<any> = [];
        for (let i = 0; i < 15; i++){
            quest.push(
                <LessonQuestion key={i} index={i} questions={questions} setQuestions={setQuestions} part={i < 5 ? 1 : i < 10 ? 2 : 3}/>
            )
            quest.push(<br/>)
        }

        return quest;
    }

    const postAll = async (
        description:string,
        part1:any,
        part2:any,
        part3:any,
        questions:Array<any>
    ) => {
         try{

            setSubmiting(true);

            if(!description.length){
                Swal.fire({
                    title: 'Dados da Aula',
                    text: 'Campo Nome da Aula é obrigatório!',
                    icon: 'error',
                    confirmButtonColor: BootstrapColors.primary
                });
                setSubmiting(false);
                return {
                    success: false
                };
            }

            if(
                !part1?.tx_texto.length || 
                !part1?.tx_dir_img.length || 
                !part1?.tx_url_video.length
            ){
                Swal.fire({
                    title: 'Parte 1',
                    text: 'Campos Texto, Imagem e Vídeo são obrigatórios!',
                    icon: 'error',
                    confirmButtonColor: BootstrapColors.primary
                });
                setSubmiting(false);
                return {
                    success: false
                };
            }

            if(
                !part2?.tx_texto.length || 
                !part2?.tx_dir_img.length || 
                !part2?.tx_url_video.length
            ){
                Swal.fire({
                    title: 'Parte 2',
                    text: 'Campos Texto, Imagem e Vídeo são obrigatórios!',
                    icon: 'error',
                    confirmButtonColor: BootstrapColors.primary
                });
                setSubmiting(false);
                return {
                    success: false
                };
            }

            if(
                !part3?.tx_texto.length || 
                !part3?.tx_dir_img.length || 
                !part3?.tx_url_video.length
            ){
                Swal.fire({
                    title: 'Parte 3',
                    text: 'Campos Texto, Imagem e Vídeo são obrigatórios!',
                    icon: 'error',
                    confirmButtonColor: BootstrapColors.primary
                });
                setSubmiting(false);
                return {
                    success: false
                };
            }

            let error_index:any = -1;

            questions.forEach((element, index) => {
                if(
                    !element?.tx_pergunta.length||
                    !element?.options?.tx_resposta1.length||
                    !element?.options?.tx_resposta2.length||
                    !element?.options?.tx_resposta3.length||
                    !element?.options?.tx_resposta4.length||
                    !element?.options?.tx_resposta5.length
                ){
                  if(error_index === -1){
                    error_index = index;
                  }
                }
            });

            if(error_index !== -1){
                  Swal.fire({
                        title: 'Questão ' + (error_index + 1),
                        text: 'Campos Pergunta e Respostas são obrigatórios!',
                        icon: 'error',
                        confirmButtonColor: BootstrapColors.primary
                    });
                    setSubmiting(false);
                    return {
                        success: false
                    };
            }

            const response_aula:any = await Aula.post(description);

            if(response_aula?.success && response_aula?.data?.id){
                const id = response_aula?.data?.id;

                const response_part1:any = await AulaParte.post(
                    1,
                    id,
                    'Parte 1',
                    part1?.tx_texto,
                    part1?.tx_dir_img,
                    part1?.tx_url_video
                );

                if(!response_part1?.success){
                    throw new Error(response_part1?.message??'Erro ao tentar criar parte da aula.');
                }

                const response_part2:any = await AulaParte.post(
                    2,
                    id,
                    'Parte 2',
                    part2?.tx_texto,
                    part2?.tx_dir_img,
                    part2?.tx_url_video
                );

                if(!response_part2?.success){
                    throw new Error(response_part2?.message??'Erro ao tentar criar parte da aula.');
                }

                const response_part3:any = await AulaParte.post(
                    3,
                    id,
                    'Parte 3',
                    part3?.tx_texto,
                    part3?.tx_dir_img,
                    part3?.tx_url_video
                );

                if(!response_part3?.success){
                    throw new Error(response_part3?.message??'Erro ao tentar criar parte da aula.');
                }

                let j = 0;
                for(const questao of questions){
                    let id_parte = 1;
                    if(j >= 5){
                        id_parte = 2;
                    }
                    if(j >= 10){
                        id_parte = 3;
                    }
                    j++;

                    const alternativas = {
                        0: {label: questao?.options?.tx_resposta1, id:0},
                        1: {label: questao?.options?.tx_resposta2, id:1},
                        2: {label: questao?.options?.tx_resposta3, id:2},
                        3: {label: questao?.options?.tx_resposta4, id:3},
                        4: {label: questao?.options?.tx_resposta5, id:4}
                    }

                    const tx_alternativas = JSON.stringify(alternativas);

                    const res:any = await AulaQuestao.post(
                        id,
                        id_parte,
                        questao?.tx_pergunta,
                        tx_alternativas,
                        questao?.id_resposta
                    );

                    if(!res.success){
                        throw new Error(res.message??`Erro ao tentar criar questão ${j+1} a aula.`);
                    }
                }

                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Aula criada com sucesso.',
                    icon: 'success',
                    confirmButtonColor: BootstrapColors.primary
                }).then(() => {
                    setSubmiting(false);
                    navigate(`/admin-lesson?id=${id}`);
                })

            }else{
                throw new Error(response_aula?.message??'Erro ao tentar criar a aula.');
            }

        }catch(error:any){
            setSubmiting(false);
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao tentar criar questão.',
                icon: 'error',
                confirmButtonColor: BootstrapColors.primary
            })
            console.error(error);
            return {
                success: false
            }
        }
    }

    const del = async (
        aula:any
    ) => {
        try{

            setSubmiting(true);

            Swal.fire({
                title: 'Aviso!',
                text: 'Tem certeza que deseja excluir a aula?',
                icon: 'warning',
                confirmButtonColor: BootstrapColors.success,
                confirmButtonText: 'Sim',
                showCancelButton: true,
                cancelButtonColor: BootstrapColors.danger,
                cancelButtonText: 'Não'
            }).then(async (res) => {
                if(res.isConfirmed){
                    const response = await aula?.delete();

                    if(response?.success){
                        Swal.fire({
                            title: 'Sucesso!',
                            text: 'Aula deletada com sucesso.',
                            icon: 'success',
                            confirmButtonColor: BootstrapColors.primary,
                        }).then(() => {
                            setSubmiting(false);
                            navigate('/admin-lesson-list');
                        })
                    }else{
                        throw new Error(response?.message??'Erro ao tentar deletar aula.');
                    }
                }
                setSubmiting(false);
            });

        }catch(error:any){
            setSubmiting(false);
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao tentar excluir a aula',
                icon: 'error'
            })
            console.error(error);
            return {
                success: false
            }
        }
    }

    return(
        <ReactBootstrapComponents.Screen title="Questionário">
            {
                hadleQuestions()
            }
            <div style={{display: id_questao?'none':'flex', width: '100%', justifyContent: 'flex-end'}}>
                <ReactBootstrapComponents.Button
                disabled={submiting}
                text="Incluir"
                icon={
                    submiting?
                    <ReactBootstrapComponents.Spinner/>:
                    <ReactBootstrapComponents.Icon
                    name={faPlus}
                    />
                }
                onClick={() => postAll(description, part1, part2, part3, questions)}
                />
            </div>
            <div style={{display: id_questao?'flex':'none', width: '100%', justifyContent: 'flex-end', gap:10}}>
                 <ReactBootstrapComponents.Button
                    disabled={submiting}
                    text="Salvar"
                    icon={
                        submiting?
                        <ReactBootstrapComponents.Spinner/>:
                        <ReactBootstrapComponents.Icon
                        name={faFloppyDisk}
                        />
                    }
                    onClick={() => alert('Salvando')}
                    variant="primary"
                />
                <ReactBootstrapComponents.Button
                    disabled={submiting}
                    text="Excluir"
                    icon={
                        submiting?
                        <ReactBootstrapComponents.Spinner/>:
                        <ReactBootstrapComponents.Icon
                        name={faTrash}
                        />
                    }
                    onClick={() => del(aula)}
                    variant="danger"
                />
            </div>
        </ReactBootstrapComponents.Screen>
    );
}