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
import { faCircleCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

interface LessonQuestionary {
    part1:any,
    part2:any,
    part3:any,
    questions:any,
    setQuestions:any,
    id_aula:number,
    id_aluno:number,
    loFinalizado:boolean,
    acertos:number
}

export const LessonQuestionary = ({
    part1,
    part2,
    part3,
    questions,
    setQuestions,
    id_aula,
    id_aluno,
    loFinalizado,
    acertos
}:LessonQuestionary) => {

    const navigate = useNavigate();
    const [submiting, setSubmiting] = useState(false);

    const hadleQuestions = () => {
        let quest:Array<any> = [];
        for (let i = 0; i < 15; i++){
            if(loFinalizado){
               quest.push(
    <>                     
    <ReactBootstrapComponents.Accordion title={`Questão ${i+1} (Parte ${i < 5 ? 1 : i < 10 ? 2 : 3})`} isOpen={true}>
        <b>{questions[i].tx_descricao}</b>
        <div>Alternativas: </div>
        {/* Alternativa A */}
        <div style={{display: 'flex'}}>
            {questions[i]?.id_resposta_aluno == 0 ? 
            <b>A. {questions[i]?.alternativas?.tx_resposta1}</b> : 
            `A. ${questions[i]?.alternativas?.tx_resposta1}`
            } 
            {
                questions[i]?.id_resposta != 0 ?
                (
                   questions[i]?.id_resposta_aluno == 0  ?
                   <span style={{display: 'flex', gap:2, color:BootstrapColors.danger, alignItems: 'center', marginLeft: 7}}>
                        <ReactBootstrapComponents.Icon
                        name={faCircleExclamation}
                        color={BootstrapColors.danger}
                        size="1x"
                        />
                        <b> Errou!</b>
                   </span>
                   :
                   ''
                )
                :
                questions[i]?.id_resposta_aluno == 0 ?
                    <span style={{display: 'flex', gap:2, color:BootstrapColors.success, alignItems: 'center', marginLeft: 7}}>
                        <ReactBootstrapComponents.Icon
                        name={faCircleCheck}
                        color={BootstrapColors.success}
                        size="1x"
                        />
                        <b> Acertou!</b>
                   </span>
                :
                    <span style={{display: 'flex', gap:2, color:BootstrapColors.warning, alignItems: 'center', marginLeft: 7}}>
                        <ReactBootstrapComponents.Icon
                        name={faCircleExclamation}
                        color={BootstrapColors.warning}
                        size="1x"
                        />
                        <b> Resposta correta!</b>
                   </span>
            }
        </div>
        
        {/* Alternativa B */}
        <div style={{display: 'flex'}}>
            {questions[i]?.id_resposta_aluno == 1 ? 
            <b>B. {questions[i]?.alternativas?.tx_resposta2}</b> : 
            `B. ${questions[i]?.alternativas?.tx_resposta2}`
            } 
            {
                questions[i]?.id_resposta != 1 ?
                (
                   questions[i]?.id_resposta_aluno == 1  ?
                   <span style={{display: 'flex', gap:2, color:BootstrapColors.danger, alignItems: 'center', marginLeft: 7}}>
                        <ReactBootstrapComponents.Icon
                        name={faCircleExclamation}
                        color={BootstrapColors.danger}
                        size="1x"
                        />
                        <b> Errou!</b>
                   </span>
                   :
                   ''
                )
                :
                questions[i]?.id_resposta_aluno == 1 ?
                    <span style={{display: 'flex', gap:2, color:BootstrapColors.success, alignItems: 'center', marginLeft: 7}}>
                        <ReactBootstrapComponents.Icon
                        name={faCircleCheck}
                        color={BootstrapColors.success}
                        size="1x"
                        />
                        <b> Acertou!</b>
                   </span>
                :
                    <span style={{display: 'flex', gap:2, color:BootstrapColors.warning, alignItems: 'center', marginLeft: 7}}>
                        <ReactBootstrapComponents.Icon
                        name={faCircleExclamation}
                        color={BootstrapColors.warning}
                        size="1x"
                        />
                        <b> Resposta correta!</b>
                   </span>
            }
        </div>
        
        {/* Alternativa C */}
        <div style={{display: 'flex'}}>
            {questions[i]?.id_resposta_aluno == 2 ? 
            <b>C. {questions[i]?.alternativas?.tx_resposta3}</b> : 
            `C. ${questions[i]?.alternativas?.tx_resposta3}`
            } 
            {
                questions[i]?.id_resposta != 2 ?
                (
                   questions[i]?.id_resposta_aluno == 2  ?
                   <span style={{display: 'flex', gap:2, color:BootstrapColors.danger, alignItems: 'center', marginLeft: 7}}>
                        <ReactBootstrapComponents.Icon
                        name={faCircleExclamation}
                        color={BootstrapColors.danger}
                        size="1x"
                        />
                        <b> Errou!</b>
                   </span>
                   :
                   ''
                )
                :
                questions[i]?.id_resposta_aluno == 2 ?
                    <span style={{display: 'flex', gap:2, color:BootstrapColors.success, alignItems: 'center', marginLeft: 7}}>
                        <ReactBootstrapComponents.Icon
                        name={faCircleCheck}
                        color={BootstrapColors.success}
                        size="1x"
                        />
                        <b> Acertou!</b>
                   </span>
                :
                    <span style={{display: 'flex', gap:2, color:BootstrapColors.warning, alignItems: 'center', marginLeft: 7}}>
                        <ReactBootstrapComponents.Icon
                        name={faCircleExclamation}
                        color={BootstrapColors.warning}
                        size="1x"
                        />
                        <b> Resposta correta!</b>
                   </span>
            }
        </div>
        
        {/* Alternativa D */}
        <div style={{display: 'flex'}}>
            {questions[i]?.id_resposta_aluno == 3 ? 
            <b>D. {questions[i]?.alternativas?.tx_resposta4}</b> : 
            `D. ${questions[i]?.alternativas?.tx_resposta4}`
            } 
            {
                questions[i]?.id_resposta != 3 ?
                (
                   questions[i]?.id_resposta_aluno == 3  ?
                   <span style={{display: 'flex', gap:2, color:BootstrapColors.danger, alignItems: 'center', marginLeft: 7}}>
                        <ReactBootstrapComponents.Icon
                        name={faCircleExclamation}
                        color={BootstrapColors.danger}
                        size="1x"
                        />
                        <b> Errou!</b>
                   </span>
                   :
                   ''
                )
                :
                questions[i]?.id_resposta_aluno == 3 ?
                    <span style={{display: 'flex', gap:2, color:BootstrapColors.success, alignItems: 'center', marginLeft: 7}}>
                        <ReactBootstrapComponents.Icon
                        name={faCircleCheck}
                        color={BootstrapColors.success}
                        size="1x"
                        />
                        <b> Acertou!</b>
                   </span>
                :
                    <span style={{display: 'flex', gap:2, color:BootstrapColors.warning, alignItems: 'center', marginLeft: 7}}>
                        <ReactBootstrapComponents.Icon
                        name={faCircleExclamation}
                        color={BootstrapColors.warning}
                        size="1x"
                        />
                        <b> Resposta correta!</b>
                   </span>
            }
        </div>
        
        {/* Alternativa E */}
        <div style={{display: 'flex'}}>
            {questions[i]?.id_resposta_aluno == 4 ? 
            <b>E. {questions[i]?.alternativas?.tx_resposta5}</b> : 
            `E. ${questions[i]?.alternativas?.tx_resposta5}`
            } 
            {
                questions[i]?.id_resposta != 4 ?
                (
                   questions[i]?.id_resposta_aluno == 4  ?
                   <span style={{display: 'flex', gap:2, color:BootstrapColors.danger, alignItems: 'center', marginLeft: 7}}>
                        <ReactBootstrapComponents.Icon
                        name={faCircleExclamation}
                        color={BootstrapColors.danger}
                        size="1x"
                        />
                        <b> Errou!</b>
                   </span>
                   :
                   ''
                )
                :
                questions[i]?.id_resposta_aluno == 4 ?
                    <span style={{display: 'flex', gap:2, color:BootstrapColors.success, alignItems: 'center', marginLeft: 7}}>
                        <ReactBootstrapComponents.Icon
                        name={faCircleCheck}
                        color={BootstrapColors.success}
                        size="1x"
                        />
                        <b> Acertou!</b>
                   </span>
                :
                    <span style={{display: 'flex', gap:2, color:BootstrapColors.warning, alignItems: 'center', marginLeft: 7}}>
                        <ReactBootstrapComponents.Icon
                        name={faCircleExclamation}
                        color={BootstrapColors.warning}
                        size="1x"
                        />
                        <b> Resposta correta!</b>
                   </span>
            }
        </div>
    </ReactBootstrapComponents.Accordion><br/>
    </>
);
            }else{
                quest.push(
                    <LessonQuestion key={i} index={i} questions={questions} setQuestions={setQuestions} part={i < 5 ? 1 : i < 10 ? 2 : 3}/>
                )
                quest.push(<br/>)
            }
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

            setSubmiting(true);

            const resAl:any = await Aluno.get(id_aluno);
            const Al:Aluno = resAl?.data;

            if(!Al){
                throw new Error(resAl?.message??'Erro ao tentar buscar os dados do aluno.');
            }

            let nu_acertos_texto = Al.getNuAcertosTexto();
            let nu_erros_texto = Al.getNuErrosTexto();
            let nu_acertos_imagem = Al.getNuAcertosImagem();
            let nu_erros_imagem = Al.getNuErrosImagem();
            let nu_acertos_video = Al.getNuAcertosVideo();
            let nu_erros_video = Al.getNuErrosVideo();

            let acertos = [];
            let erros = [];

            for (const element of questions) {
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

                        switch(element.tx_tipo){
                            case 'texto':
                                nu_acertos_texto++;
                                break;
                            case 'imagem':
                                nu_acertos_imagem++;
                                break;
                            case 'video':
                                nu_acertos_video++;
                                break;
                        }

                    }else{

                        erros.push(element.id_questao);

                         switch(element.tx_tipo){
                            case 'texto':
                                nu_erros_texto++;
                                break;
                            case 'imagem':
                                nu_erros_imagem++;
                                break;
                            case 'video':
                                nu_erros_video++;
                                break;
                        }

                    }
                }
            }

            const media = ((100*acertos.length)/(acertos.length + erros.length));

            const res:any = await AulaAluno.get(id_aluno, id_aula);

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

            }

            if(response?.success){

                const res_al_put:any = await Al.put(
                    undefined,
                    undefined,
                    undefined,
                    nu_acertos_texto,
                    nu_erros_texto,
                    nu_acertos_imagem,
                    nu_erros_imagem,
                    nu_acertos_video,
                    nu_erros_video
                );

                if(!res_al_put?.success){
                    throw new Error(res_al_put?.message??'Erro ao tentar atualizar histórico do Aluno.');
                }
       
                const mediaFormatada = media.toFixed(2).toString();

                    await AulaAlunoQuestao.deleteAll(id_aula, id_aluno);

                    // if(!resQuestAulaAluno?.success || !resQuestAulaAluno.data.length){
                        for(const questao of questions){
                            const res:any = await AulaAlunoQuestao.post(
                                id_aula,
                                id_aluno,
                                questao.id+1,
                                questao.id_resposta_aluno,
                                questao.tx_tipo,
                                (questao?.id_resposta_aluno == questao?.id_resposta ? 'S' : 'N')
                            );

                            if(!res?.success){
                                throw new Error(res?.message??`Erro ao tentar questao ${questao?.id} do aluno.`);
                            }
                        }
                    // }else{
                    //      for(const questao of questions){
                    //         const res:any = await AulaAlunoQuestao.put(
                    //             id_aula,
                    //             id_aluno,
                    //             questao.id+1,
                    //             questao.id_resposta_aluno,
                    //             questao.tx_tipo,
                    //             (questao?.id_resposta_aluno == questao?.id_resposta ? 'S' : 'N')
                    //         );

                    //         if(!res?.success){
                    //             throw new Error(res?.message??`Erro ao tentar atualizar questao ${questao?.id} do aluno.`);
                    //         }
                    //     }
                    // }

                if(media >= 70){
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
                    }).then(async () => {

                        const res_aula_aluno:any = await AulaAluno.get(id_aluno, id_aula);
                        const aulaAluno = res_aula_aluno?.data;

                        await aulaAluno.put(
                            'S',
                            acertos.length,
                            erros.length,
                            part1?.tx_tipo,
                            part2?.tx_tipo,
                            part3?.tx_tipo,
                        );

                        navigate(`/student-home?id_aluno=${id_aluno}`)
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
                        window.location.reload()
                        //navigate(`/student-lesson?id=${id_aula}`)
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
        <ReactBootstrapComponents.Screen title={loFinalizado?`Questionário (${acertos}/15)`:"Questionário"}>
            {
                hadleQuestions()
            }
            <div style={{width: '100%', justifyContent: 'flex-end'}}>
                {!loFinalizado&&
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
            }
            </div>
        </ReactBootstrapComponents.Screen>
    );
}