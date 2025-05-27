import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { ReactBootstrapComponents } from "../../../utils/Bootstrap";
import { LessonQuestion } from "./LessonQuestion";

export const LessonQuestionary = (
    description:string,
    part1:any,
    part2:any,
    part3:any,
    questions:any,
    setQuestions:any,
    onCreate:(
        description:string,
        part1:any,
        part2:any,
        part3:any,
        questions:any
    ) => void
) => {

    const hadleQuestions = () => {
        let quest:Array<any> = [];
        for (let i = 0; i < 15; i++){
            quest.push(
                LessonQuestion(
                    i,
                    questions,
                    setQuestions,
                    i < 5 ? 1 : i < 10 ? 2 : 3
                )
            )
            quest.push(<br/>)
        }

        return quest;
    }

    return(
        <ReactBootstrapComponents.Screen title="Questionário">
                {
                    hadleQuestions()
                }
                <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
                    <ReactBootstrapComponents.Button
                    text="Incluir"
                    icon={
                        <ReactBootstrapComponents.Icon
                        name={faPlus}
                        />
                    }
                    onClick={() => onCreate(description, part1, part2, part3, questions)}
                    />
            </div>
        </ReactBootstrapComponents.Screen>
    );
}