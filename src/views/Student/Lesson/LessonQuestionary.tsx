import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";
import { LessonQuestion } from "./LessonQuestion";
import { BootstrapColors } from "../../../constants/Colors";
import AulaAluno from "../../../models/AulaAlunoModel";
import AulaAlunoQuestao from "../../../models/AulaAlunoQuestaoModel";
import Aluno from "../../../models/AlunoModel";

interface LessonQuestionary {
    part1:any,
    part2:any,
    part3:any,
    questions:any,
    setQuestions:any,
    id_aula:number,
    id_aluno:number
}

export const LessonQuestionary = ({
    part1,
    part2,
    part3,
    questions,
    setQuestions,
    id_aula,
    id_aluno
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
        id_aula:number,
        id_aluno: number,
        part1:any,
        part2:any,
        part3:any,
        questions:Array<any>
    ) => {
         try{

            console.log('TESTE')
            console.log("QUESIONS: ", questions);

            setSubmiting(true);

            let acertos = [];
            let erros = [];

            for (const element of questions) {
                console.log(element)
                if (element.id_resposta_aluno === null) {
                    await Swal.fire({
                    title: 'Questão não respondida!',
                    text: 'Você precisa responder todas as questões antes de enviar.',
                    icon: 'error',
                    confirmButtonColor: BootstrapColors.primary
                    });
                    setSubmiting(false);
                    return { success: false };
                }else{
                    if (element.id_resposta_aluno == element.id_resposta) {
                        acertos.push(element.id_questao);
                    }else{
                        erros.push(element.id_questao);
                    }
                }
            }

            const media = ((100*acertos.length)/(acertos.length + erros.length));

            console.log('MEDIA: ', media)

            const res:any = await AulaAluno.get(id_aluno, id_aula);

            console.log('RES: ',res)

            const resAl:any = await Aluno.get(id_aluno);
            const Al:Aluno = resAl?.data;

            if(!Al){
                throw new Error(resAl?.message??'Erro ao tentar buscar os dados do aluno.');
            }

            let response:any = {success:false};

            if(res?.success && res.data){

                const al:AulaAluno = await res?.data

                  response = await al.put(
                    media < 70 ? 'N' : 'S',
                    acertos.length,
                    erros.length,
                    part1?.tx_tipo,
                    part2?.tx_tipo,
                    part3?.tx_tipo,
                );

                console.log('RES: ', response);
            }else{
                response = await AulaAluno.post(
                    id_aluno,
                    id_aula,
                    media < 70 ? 'N' : 'S',
                    acertos.length,
                    erros.length,
                    part1?.tx_tipo,
                    part2?.tx_tipo,
                    part3?.tx_tipo,
                );

                console.log('RES: ', response);
            }
            console.log(media < 70 ? 'N' : 'S');
            return;

            if(response?.success){
                console.log('AQUI')
                console.log(media)
                const mediaFormatada = media.toFixed(2).toString();
                if(media >= 70){
                    console.log(questions)

                    if(res?.success && res.data){
                        for(const questao of questions){
                            console.log('QUES: ', questao);
                            const res:any = await AulaAlunoQuestao.post(
                                id_aula,
                                id_aluno,
                                questao.id+1,
                                questao.id_resposta_aluno,
                                questao.tx_tipo,
                                (questao?.id_resposta_aluno == questao?.id_resposta ? 'S' : 'N')
                            );

                            if(!res?.success){
                                console.log(res)
                                throw new Error(res?.message??`Erro ao tentar questao ${questao?.id} do aluno.`);
                            }
                        }
                    }else{
                         for(const questao of questions){
                            console.log('QUES: ', questao);
                            const res:any = await AulaAlunoQuestao.put(
                                id_aula,
                                id_aluno,
                                questao.id+1,
                                questao.id_resposta_aluno,
                                questao.tx_tipo,
                                (questao?.id_resposta_aluno == questao?.id_resposta ? 'S' : 'N')
                            );

                            if(!res?.success){
                                throw new Error(res?.message??`Erro ao tentar atualizar questao ${questao?.id} do aluno.`);
                            }
                        }
                    }

                    Swal.fire({
                        title: 'Sucesso!',
                        html: (
                           ` <div>
                                <div>
                                    Você foi aprovado!
                                </div>
                                <div>
                                    Média: ${mediaFormatada}%
                                </div>
                            </div>`
                        ),
                        icon: 'success',
                        confirmButtonColor: BootstrapColors.primary
                    }).then(() => {
                        navigate('/student-home')
                    })
                }else{
                    Swal.fire({
                        title: 'Aviso!',
                        html: 
                           `<div>
                                <div>
                                    Você não alcançou a média mínima! Por favor estude a nova aula que será criada para você e refassa os exercícios.
                                </div>
                                <div>
                                    Média: ${mediaFormatada}%
                                </div>
                            </div>`
                        ,
                        icon: 'warning',
                        confirmButtonColor: BootstrapColors.primary
                    }).then(() => {
                        navigate(`/student-lesson?id=${id_aula}`)
                    })
                }

            }else{
                throw new Error(response?.message??'Erro ao tentar criar aula do aluno.');
            }

        }catch(error:any){
            setSubmiting(false);
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao enviar a aula do aluno.',
                icon: 'error',
                confirmButtonColor: BootstrapColors.primary
            })
            console.error(error);
            return {
                success: false
            }
        }finally{
            setSubmiting(false);
        }
    }

    return(
        <ReactBootstrapComponents.Screen title="Questionário">
            {
                hadleQuestions()
            }
            <div style={{width: '100%', justifyContent: 'flex-end'}}>
                <ReactBootstrapComponents.Button
                disabled={submiting}
                text="Enviar Respostas"
                icon={
                    submiting?
                    <ReactBootstrapComponents.Spinner/>:
                    <ReactBootstrapComponents.Icon
                    name={faCheck}
                    />
                }
                onClick={() => postAll(id_aula, id_aluno, part1, part2, part3, questions)}
                />
            </div>
        </ReactBootstrapComponents.Screen>
    );
}