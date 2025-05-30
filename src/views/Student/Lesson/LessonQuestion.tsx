import { ReactBootstrapComponents } from "../../../utils/Bootstrap";

interface LessonQuestion {
    index:number,
    questions:Array<any>,
    setQuestions: (questions:Array<any>) => void,
    part: number
}

export const LessonQuestion = ({
    index,
    questions,
    setQuestions,
    part
}:LessonQuestion) => {

    return(
        <ReactBootstrapComponents.Accordion title={`Questão ${index+1} (Parte ${part})`} isOpen={true}>
            <div>Selecione a alternativa correta: </div>
            <ReactBootstrapComponents.Form
            inputs={[
                {
                    label: questions[index]?.tx_descricao,
                    type: 'radio',
                    name: 'id_resposta_aluno',
                    value: questions[index]?.id_resposta_aluno,
                    options: [
                        { label: 'A. '+questions[index]?.alternativas?.tx_resposta1, value: 0 },
                        { label: 'B. '+questions[index]?.alternativas?.tx_resposta2, value: 1 },
                        { label: 'C. '+questions[index]?.alternativas?.tx_resposta3, value: 2 },
                        { label: 'D. '+questions[index]?.alternativas?.tx_resposta4, value: 3 },
                        { label: 'E. '+questions[index]?.alternativas?.tx_resposta5, value: 4 },
                    ],
                    onChange: (e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].id_resposta_aluno = Number(e.target.value);
                        setQuestions(newQuestions);
                    }
                }
            ]}
            />
        </ReactBootstrapComponents.Accordion>
    );
}