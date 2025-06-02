import { faBookOpen } from "@fortawesome/free-solid-svg-icons"

import { ReactBootstrapComponents } from "../../../utils/Bootstrap"
import { BootstrapColors } from "../../../constants/Colors"

interface LessonPart {
    part: any,
    setPart:(value:any) => void,
    title: string
}

export const LessonPart = ({
    part,
    setPart,
    title
}:LessonPart) => {
    return(
        <ReactBootstrapComponents.Screen title={title}>
            <center style={{margin: 30}}>
                <ReactBootstrapComponents.Icon
                name={faBookOpen}
                color={BootstrapColors.primary}
                size="5x"
                />
            </center>
            <ReactBootstrapComponents.Form
            inputs={
                [
                    {
                        label: "Texto *",
                        name: "tx_texto",
                        type: "textarea",
                        placeholder: "Insira o texto da aula",
                        id: "tx_texto",
                        value: part?.tx_texto,
                        onChange: (e) => setPart({...part, tx_texto: e.target.value})
                    },
                    {
                        label: "Imagem *",
                        name: "tx_dir_img",
                        type: "text",
                        placeholder: "Insira o link da imagem da aula",
                        id: "tx_dir_img",
                        value: part?.tx_dir_img,
                        onChange: (e) => setPart({...part, tx_dir_img: e.target.value})
                    },
                     {
                        label: "Vídeo *",
                        name: "tx_url_video",
                        type: "text",
                        placeholder: "Insira o link do vídeo da aula",
                        id: "tx_url_video",
                        value: part?.tx_url_video,
                        onChange: (e) => setPart({...part, tx_url_video: e.target.value})
                    }
                ]
            }
            />
            {
            part?.tx_dir_img&&
            <center>
                <h4>Imagem</h4>
                <ReactBootstrapComponents.Image
                src={part?.tx_dir_img}
                fluid={false}
                height={400}
                />
            </center>
            }
            {
            part?.tx_url_video&&
            <center>
                <h4>Vídeo</h4>
                <ReactBootstrapComponents.Video
                src={part?.tx_url_video}
                height={400}
                />
            </center>
            }
        </ReactBootstrapComponents.Screen>
    )
}