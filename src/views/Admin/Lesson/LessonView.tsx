import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";
import { LessonForm } from "./LessonForm";
import { LessonPart } from "./LessonPart";
import { LessonQuestionary } from "./LessonQuestionary";
import { faBook, faBookOpen, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { BootstrapColors } from "../../../constants/Colors";
import { getAll } from "./LessonModelView";

const LessonView = () => {

    const [description,setDescription] = useState<string>('');
    const [part1, setPart1] = useState<object>({
        tx_texto:'',
        tx_dir_img: '',
        tx_url_video: ''
    });
    const [part2, setPart2] = useState<object>({
        tx_texto:'',
        tx_dir_img: '',
        tx_url_video: ''
    });
    const [part3, setPart3] = useState<object>({
        tx_texto:'',
        tx_dir_img: '',
        tx_url_video: ''
    });
    const [questions, setQuestions] = useState<Array<Object>>([
        {
            key: 0,
            tx_pergunta: '',
            id_resposta: 0,
            options: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: ''
            }
        },
        {
            key: 1,
            tx_pergunta: '',
            id_resposta: 0,
            options: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: ''
            }
        },
        {
            key: 2,
            tx_pergunta: '',
            id_resposta: 0,
            options: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: ''
            }
        },
        {
            key: 3,
            tx_pergunta: '',
            id_resposta: 0,
            options: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: ''
            }
        },
        {
            key: 4,
            tx_pergunta: '',
            id_resposta: 0,
            options: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: ''
            }
        },
        {
            key: 5,
            tx_pergunta: '',
            id_resposta: 0,
            options: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: ''
            }
        },
        {
            key: 6,
            tx_pergunta: '',
            id_resposta: 0,
            options: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: ''
            }
        },
        {
            key: 7,
            tx_pergunta: '',
            id_resposta: 0,
            options: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: ''
            }
        },
        {
            key: 8,
            tx_pergunta: '',
            id_resposta: 0,
            options: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: ''
            }
        },
        {
            key: 9,
            tx_pergunta: '',
            id_resposta: 0,
            options: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: ''
            }
        },
        {
            key: 10,
            tx_pergunta: '',
            id_resposta: 0,
            options: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: ''
            }
        },
        {
            key: 11,
            tx_pergunta: '',
            id_resposta: 0,
            options: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: ''
            }
        },
        {
            key: 12,
            tx_pergunta: '',
            id_resposta: 0,
            options: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: ''
            }
        },
        {
            key: 13,
            tx_pergunta: '',
            id_resposta: 0,
            options: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: ''
            }
        },
        {
            key: 14,
            tx_pergunta: '',
            id_resposta: 0,
            options: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: ''
            }
        },
    ]);
    const [loading, setLoading] = useState<boolean>(false);
    const [aula, setAula] = useState<any>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const id = Number(searchParams.get("id"))||0;

    useEffect(() => {
        const fetchData = async () => {
            if(id){
                try{
                    setLoading(true);
                    const res:any = await getAll(id);
                    if(res?.success){
                        const newAula = res?.data?.aula;
                        setAula(newAula);
                        setDescription(newAula.getTxDescricao());
                        setPart1(res?.data?.part1);
                        setPart2(res?.data?.part2);
                        setPart3(res?.data?.part3);
        
                        setQuestions(res?.data?.questoes);
                    }
                }catch(error){
                    console.error(error);
                    setLoading(false);
                }
            }
        }

        fetchData().then(() => setLoading(false));
    },[id]);

    if(loading){
        return(
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                flexDirection: 'column'
            }}>
                <h6>Carregando Dados da Aula...</h6>
                <ReactBootstrapComponents.Spinner variant="primary" size={"lg"}/>
            </div>
        )
    }

     return(
        <ReactBootstrapComponents.TabbedPages
        tabs={[
            {
                key: 'form',
                label: 'Dados da Aula',
                icon: <ReactBootstrapComponents.Icon 
                name={faBook} 
                color={BootstrapColors.blue300} 
                size="2x"/>,
                content: <LessonForm description={description} setDescription={setDescription}/>
            },
            {
                key: 'part1',
                label: 'Parte 1',
                icon: <ReactBootstrapComponents.Icon 
                name={faBookOpen} 
                color={BootstrapColors.blue300} 
                size="2x"/>,
                content: <LessonPart part={part1} setPart={setPart1} title="Parte 1"/>
            },
            {
                key: 'part2',
                label: 'Parte 2',
                icon: <ReactBootstrapComponents.Icon 
                name={faBookOpen} 
                color={BootstrapColors.blue300} 
                size="2x"/>,
                content: <LessonPart part={part2} setPart={setPart2} title="Parte 2"/>
            },
            {
                key: 'part3',
                label: 'Parte 3',
                icon: <ReactBootstrapComponents.Icon 
                name={faBookOpen} 
                color={BootstrapColors.blue300} 
                size="2x"/>,
                content: <LessonPart part={part3} setPart={setPart3} title="Parte 3"/>
            },
            {
                key: 'questionary',
                label: 'Questionário',
                icon: <ReactBootstrapComponents.Icon 
                name={faListCheck} 
                color={BootstrapColors.blue300} 
                size="2x"/>,
                content: 
                <LessonQuestionary 
                description={description}
                part1={part1}
                part2={part2}
                part3={part3}
                questions={questions}
                setQuestions={setQuestions}
                id_questao={id}
                aula={aula}
                /> 
            }
        ]}
        defaultActiveKey="form"
        />
    );
}

export default LessonView;