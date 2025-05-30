import { use, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";
import { useGlobal } from "../../../context/GlobalContext";
import { BootstrapColors } from "../../../constants/Colors";
import { faBook, faBookOpen, faListCheck } from "@fortawesome/free-solid-svg-icons";
import Aula from "../../../models/AulaModel";
import { getAll, get, make } from "./LessonModelView";
import { LessonPart } from "./LessonPart";
import { LessonQuestionary } from "./LessonQuestionary";

const LessonView = () => {

    const navigate = useNavigate();
    const [descricao, setDescricao] = useState<string>("");
    const [partes, setPartes] = useState <Array<any>>([
        {
            id: 1,
            tx_descricao: "Parte 1",
            tx_tipo: "texto",
            tx_texto: "",
            tx_dir_img: "",
            tx_url_video: ""
        },
        {
            id: 2,
            tx_descricao: "Parte 2",
            tx_tipo: "imagem",
            tx_texto: "",
            tx_dir_img: "",
            tx_url_video: ""
        },
        {
            id: 3,
            tx_descricao: "Parte 3",
            tx_tipo: "video",
            tx_texto: "",
            tx_dir_img: "",
            tx_url_video: ""
        }
    ]);
    const [questoes, setQuestoes] = useState<Array<any>>([
        {
            id: 1,
            tx_descricao: '',
            id_parte: 1,
            tx_tipo: "texto",
            alternativas: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: '',
            },
            id_resposta: null,
            id_resposta_aluno: null
        },
        {
            id: 2,
            tx_descricao: '',
            id_parte: 1,
            tx_tipo: "texto",
            alternativas: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: '',
            },
            id_resposta: null,
            id_resposta_aluno: null
        },
        {
            id: 3,
            tx_descricao: '',
            id_parte: 1,
            tx_tipo: "texto",
            alternativas: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: '',
            },
            id_resposta: null,
            id_resposta_aluno: null
        },
        {
            id: 4,
            tx_descricao: '',
            id_parte: 1,
            tx_tipo: "texto",
            alternativas: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: '',
            },
            id_resposta: null,
            id_resposta_aluno: null
        },
        {
            id: 5,
            tx_descricao: '',
            id_parte: 1,
            tx_tipo: "texto",
            alternativas: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: '',
            },
            id_resposta: null,
            id_resposta_aluno: null
        },
        {
            id: 6,
            tx_descricao: '',
            id_parte: 2,
            tx_tipo: "imagem",
            alternativas: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: '',
            },
            id_resposta: null,
            id_resposta_aluno: null
        },
        {
            id: 7,
            tx_descricao: '',
            id_parte: 2,
            tx_tipo: "imagem",
            alternativas: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: '',
            },
            id_resposta: null,
            id_resposta_aluno: null
        },
        {
            id: 8,
            tx_descricao: '',
            id_parte: 2,
            tx_tipo: "imagem",
            alternativas: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: '',
            },
            id_resposta: null,
            id_resposta_aluno: null
        },
        {
            id: 9,
            tx_descricao: '',
            id_parte: 2,
            tx_tipo: "imagem",
            alternativas: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: '',
            },
            id_resposta: null,
            id_resposta_aluno: null
        },
        {
            id: 10,
            tx_descricao: '',
            id_parte: 2,
            tx_tipo: "imagem",
            alternativas: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: '',
            },
            id_resposta: null,
            id_resposta_aluno: null
        },
        {
            id: 11,
            tx_descricao: '',
            id_parte: 3,
            tx_tipo: "video",
            alternativas: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: '',
            },
            id_resposta: null,
            id_resposta_aluno: null
        },
        {
            id: 12,
            tx_descricao: '',
            id_parte: 3,
            tx_tipo: "video",
            alternativas: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: '',
            },
            id_resposta: null,
            id_resposta_aluno: null
        },
        {
            id: 13,
            tx_descricao: '',
            id_parte: 3,
            tx_tipo: "video",
            alternativas: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: '',
            },
            id_resposta: null,
            id_resposta_aluno: null
        },
        {
            id: 14,
            tx_descricao: '',
            id_parte: 3,
            tx_tipo: "video",
            alternativas: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: '',
            },
            id_resposta: null,
            id_resposta_aluno: null
        },
        {
            id: 15,
            tx_descricao: '',
            id_parte: 3,
            tx_tipo: "video",
            alternativas: {
                tx_resposta1: '',
                tx_resposta2: '',
                tx_resposta3: '',
                tx_resposta4: '',
                tx_resposta5: '',
            },
            id_resposta: null,
            id_resposta_aluno: null
        },
    ]);
    const [loading, setLoading] = useState<boolean>(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const id_aula = Number(searchParams.get("id"))||0;

    const { state } = useGlobal();
    const id_aluno = state?.user?.getId()||0;

    useEffect(() => {
        const fetchData = async () => {
            try{

                setLoading(true);

                if(!id_aula){
                    window.close();
                    return;
                }

                const response:any = await getAll(id_aula);

                if(response?.success){
                    const aula:Aula = response?.data?.aula;
                    const desc:string = aula?.getTxDescricao();
                    setDescricao(desc);

                    const part1 = response?.data?.part1;
                    const part2 = response?.data?.part2;
                    const part3 = response?.data?.part3;

                    const newQuestoes = response?.data?.questoes.map((element:any, index:number) => {
                        return {
                            id: element?.id,
                            tx_descricao: element?.tx_descricao,
                            id_parte: questoes[index]?.id_parte,
                            tx_tipo: questoes[index]?.tx_tipo,
                            alternativas: {
                                tx_resposta1: element?.alternativas?.tx_resposta1,
                                tx_resposta2: element?.alternativas?.tx_resposta2,
                                tx_resposta3: element?.alternativas?.tx_resposta3,
                                tx_resposta4: element?.alternativas?.tx_resposta4,
                                tx_resposta5: element?.alternativas?.tx_resposta5,
                            },
                            id_resposta: element?.id_resposta,
                            id_resposta_aluno: questoes[index]?.id_resposta_aluno
                        }
                    });
                    setQuestoes(newQuestoes);

                    const response2:any = await make(id_aluno);

                    if(response2?.success){
                        const p = response2?.data;

                        const p1 = {
                            id: 1,
                            tx_descricao: "Parte 1",
                            tx_tipo: p?.tx_parte1,
                            tx_texto: part1?.tx_texto,
                            tx_dir_img: part1?.tx_dir_img,
                            tx_url_video: part1?.tx_url_video
                        };
                        const p2 = {
                            id: 2,
                            tx_descricao: "Parte 2",
                            tx_tipo: p?.tx_parte2,
                            tx_texto: part2?.tx_texto,
                            tx_dir_img: part2?.tx_dir_img,
                            tx_url_video: part2?.tx_url_video
                        };
                        const p3 = {
                            id: 3,
                            tx_descricao: "Parte 3",
                            tx_tipo: p?.tx_parte3,
                            tx_texto: part3?.tx_texto,
                            tx_dir_img: part3?.tx_dir_img,
                            tx_url_video: part3?.tx_url_video
                        };

                        setPartes([
                            p1, p2, p3
                        ])

                    }else{
                          const p1 = {
                            id: 1,
                            tx_descricao: "Parte 1",
                            tx_tipo: "texto",
                            tx_texto: part1?.tx_texto,
                            tx_dir_img: part1?.tx_dir_img,
                            tx_url_video: part1?.tx_url_video
                        };
                        const p2 = {
                            id: 2,
                            tx_descricao: "Parte 2",
                            tx_tipo: "imagem",
                            tx_texto: part2?.tx_texto,
                            tx_dir_img: part2?.tx_dir_img,
                            tx_url_video: part2?.tx_url_video
                        };
                        const p3 = {
                            id: 3,
                            tx_descricao: "Parte 3",
                            tx_tipo: "video",
                            tx_texto: part3?.tx_texto,
                            tx_dir_img: part3?.tx_dir_img,
                            tx_url_video: part3?.tx_url_video
                        };

                        setPartes([
                            p1, p2, p3
                        ])
                    }
                }

            }catch(error:any){
                console.error(error);
            }
        }

        fetchData()
        .then(() => setLoading(false))
        .catch(() => setLoading(false))
    }, [])

     return(
          <ReactBootstrapComponents.TabbedPages
            tabs={[
                {
                    key: 'data',
                    label: 'Dados da Aula',
                    icon: <ReactBootstrapComponents.Icon 
                    name={faBook} 
                    color={BootstrapColors.blue300} 
                    size="2x"/>,
                    content: (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '90vh',
                            backgroundColor: BootstrapColors.primary
                        }}>
                            <ReactBootstrapComponents.Icon
                            name={faBook}
                            size="7x"
                            color="#fff"
                            />
                            <h2 style={{
                                color: '#fff',
                                margin: 25
                            }}>
                                {descricao}
                            </h2>
                        </div>
                    )
                },
                {
                    key: 'part1',
                    label: 'Parte 1',
                    icon: partes[0]?.tx_tipo === 'texto' ?<ReactBootstrapComponents.Icon 
                    name={faBookOpen} 
                    color={BootstrapColors.blue300} 
                    size="2x"/>:'',
                    content: <LessonPart title="Parte 1"  type={partes[0]?.tx_tipo} content={
                        partes[0]?.tx_tipo === 'texto' ?
                        partes[0]?.tx_texto
                        : partes[0]?.tx_tipo === 'imagem' ?
                        partes[0]?.tx_dir_img
                        :
                        partes[0]?.tx_url_video
                    }/>
                },
                {
                    key: 'part2',
                    label: 'Parte 2',
                    icon: <ReactBootstrapComponents.Icon 
                    name={faBookOpen} 
                    color={BootstrapColors.blue300} 
                    size="2x"/>,
                    content: <LessonPart title="Parte 2"  type={partes[1]?.tx_tipo} content={
                        partes[1]?.tx_tipo === 'texto' ?
                        partes[1]?.tx_texto
                        : partes[1]?.tx_tipo === 'imagem' ?
                        partes[1]?.tx_dir_img
                        :
                        partes[1]?.tx_url_video
                    }/>
                },
                {
                    key: 'part3',
                    label: 'Parte 3',
                    icon: <ReactBootstrapComponents.Icon 
                    name={faBookOpen} 
                    color={BootstrapColors.blue300} 
                    size="2x"/>,
                    content: <LessonPart title="Parte 3"  type={partes[2]?.tx_tipo} content={
                        partes[2]?.tx_tipo === 'texto' ?
                        partes[2]?.tx_texto
                        : partes[2]?.tx_tipo === 'imagem' ?
                        partes[2]?.tx_dir_img
                        :
                        partes[2]?.tx_url_video
                    }/>
                },
                {
                    key: 'questionary',
                    label: 'Questionário',
                    icon: <ReactBootstrapComponents.Icon 
                    name={faListCheck} 
                    color={BootstrapColors.blue300} 
                    size="2x"/>,
                    content: <LessonQuestionary
                    questions={questoes}
                    setQuestions={setQuestoes}
                    id_aula={id_aula}
                    id_aluno={id_aluno}
                    part1={partes[0]}
                    part2={partes[1]}
                    part3={partes[2]}
                    />
                }
            ]}
            defaultActiveKey="data"
            />
    );
}

export default LessonView;