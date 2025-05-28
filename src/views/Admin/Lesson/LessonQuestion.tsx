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
        <ReactBootstrapComponents.Accordion title={`Questão ${index+1} (Parte ${part})`}>
            <ReactBootstrapComponents.Form
            inputs={[
                {
                    label: 'Pergunta *',
                    type: 'textarea',
                    name: 'tx_pergunta',
                    value: questions[index]?.tx_pergunta,
                    onChange: (e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].tx_pergunta = e.target.value;
                        setQuestions(newQuestions);
                    }
                },
                 {
                    label: 'Resposta 1 *',
                    type: 'text',
                    name: 'tx_resposta1',
                    value: questions[index]?.options.tx_resposta1,
                    onChange: (e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].options.tx_resposta1 = e.target.value;
                        setQuestions(newQuestions);
                    }
                },
                 {
                    label: 'Resposta 2 *',
                    type: 'text',
                    name: 'tx_resposta2',
                    value: questions[index]?.options.tx_resposta2,
                    onChange: (e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].options.tx_resposta2 = e.target.value;
                        setQuestions(newQuestions);
                    }
                },
                 {
                    label: 'Resposta 3 *',
                    type: 'text',
                    name: 'tx_resposta3',
                    value: questions[index]?.options.tx_resposta3,
                    onChange: (e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].options.tx_resposta3 = e.target.value;
                        setQuestions(newQuestions);
                    }
                },
                 {
                    label: 'Resposta 4 *',
                    type: 'text',
                    name: 'tx_resposta4',
                    value: questions[index]?.options.tx_resposta4,
                    onChange: (e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].options.tx_resposta4 = e.target.value;
                        setQuestions(newQuestions);
                    }
                },
                 {
                    label: 'Resposta 5 *',
                    type: 'text',
                    name: 'tx_resposta5',
                    value: questions[index]?.options.tx_resposta5,
                    onChange: (e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].options.tx_resposta5 = e.target.value;
                        setQuestions(newQuestions);
                    }
                },
                {
                    label: 'Resposta correta',
                    type: 'radio',
                    name: 'id_resposta',
                    value: questions[index]?.id_resposta,
                    options: [
                        { label: 'Resposta 1', value: 0 },
                        { label: 'Resposta 2', value: 1 },
                        { label: 'Resposta 3', value: 2 },
                        { label: 'Resposta 4', value: 3 },
                        { label: 'Resposta 5', value: 4 },
                    ],
                    onChange: (e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].id_resposta = Number(e.target.value);
                        setQuestions(newQuestions);
                    }
                }
            ]}
            />
        </ReactBootstrapComponents.Accordion>
    );
}