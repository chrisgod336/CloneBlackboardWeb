import { faBookOpen } from "@fortawesome/free-solid-svg-icons"

import { ReactBootstrapComponents } from "../../../utils/Bootstrap"
import { BootstrapColors } from "../../../constants/Colors"

interface LessonPart {
    title: string,
    content: string,
    type: string
}

export const LessonPart = ({
    title,
    content,
    type
}:LessonPart) => {
    return(
        <ReactBootstrapComponents.Screen title={title}>
            <center style={{margin: 30}}>
               { 
                type === 'texto'?
                <ReactBootstrapComponents.Icon
                name={faBookOpen}
                color={BootstrapColors.primary}
                size="5x"
                />:''
            }
            </center>
            {
                type === 'texto' ?
                <h5 style={{textAlign:'center'}}>
                    {content}
                </h5>
                : type === 'imagem' ?
                <center>
                <ReactBootstrapComponents.Image
                src={content}
                fluid={false}
                height={400}
                />
                </center>
                : 
                <center>
                <ReactBootstrapComponents.Video
                src={content}
                height={400}
                />
                </center>
            }
        </ReactBootstrapComponents.Screen>
    )
}