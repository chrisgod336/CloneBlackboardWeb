import { ReactBootstrapComponents } from "../../../utils/Bootstrap";


export const LessonQuestion = (
    key:number,
    questions:Array<any>,
    setQuestions: (questions:Array<any>) => void,
    part: number,
) => {

    return(
        <ReactBootstrapComponents.Accordion title={`Questão ${key+1} (Parte ${part})`}>
            <ReactBootstrapComponents.Form
            inputs={[
                {
                    label: 'Pergunta *',
                    type: 'textarea',
                    name: 'tx_pergunta',
                    value: questions[key]?.tx_pergunta,
                    onChange: (e) => {
                        const newQuestions = [...questions];
                        newQuestions[key].tx_pergunta = e.target.value;
                        setQuestions(newQuestions);
                    }
                },
                 {
                    label: 'Resposta 1 *',
                    type: 'text',
                    name: 'tx_resposta1',
                    value: questions[key]?.options.tx_resposta1,
                    onChange: (e) => {
                        const newQuestions = [...questions];
                        newQuestions[key].options.tx_resposta1 = e.target.value;
                        setQuestions(newQuestions);
                    }
                },
                 {
                    label: 'Resposta 2 *',
                    type: 'text',
                    name: 'tx_resposta2',
                    value: questions[key]?.options.tx_resposta2,
                    onChange: (e) => {
                        const newQuestions = [...questions];
                        newQuestions[key].options.tx_resposta2 = e.target.value;
                        setQuestions(newQuestions);
                    }
                },
                 {
                    label: 'Resposta 3 *',
                    type: 'text',
                    name: 'tx_resposta3',
                    value: questions[key]?.options.tx_resposta3,
                    onChange: (e) => {
                        const newQuestions = [...questions];
                        newQuestions[key].options.tx_resposta3 = e.target.value;
                        setQuestions(newQuestions);
                    }
                },
                 {
                    label: 'Resposta 4 *',
                    type: 'text',
                    name: 'tx_resposta4',
                    value: questions[key]?.options.tx_resposta4,
                    onChange: (e) => {
                        const newQuestions = [...questions];
                        newQuestions[key].options.tx_resposta4 = e.target.value;
                        setQuestions(newQuestions);
                    }
                },
                 {
                    label: 'Resposta 5 *',
                    type: 'text',
                    name: 'tx_resposta5',
                    value: questions[key]?.options.tx_resposta5,
                    onChange: (e) => {
                        const newQuestions = [...questions];
                        newQuestions[key].options.tx_resposta5 = e.target.value;
                        setQuestions(newQuestions);
                    }
                },
                {
                    label: 'Resposta correta',
                    type: 'radio',
                    name: 'id_resposta',
                    value: questions[key]?.id_resposta,
                    options: [
                        { label: 'Resposta 1', value: 0 },
                        { label: 'Resposta 2', value: 1 },
                        { label: 'Resposta 3', value: 2 },
                        { label: 'Resposta 4', value: 3 },
                        { label: 'Resposta 5', value: 4 },
                    ],
                    onChange: (e) => {
                        const newQuestions = [...questions];
                        newQuestions[key].id_resposta = Number(e.target.value);
                        setQuestions(newQuestions);
                    }
                }
            ]}
            />
        </ReactBootstrapComponents.Accordion>
    );
}