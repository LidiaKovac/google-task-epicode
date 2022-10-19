import "./SingleTask.scss"
import { AiOutlineCheck } from "react-icons/ai"
export const Single = () => {
    return (
        <div className="single__wrap">
            <div className="single__main">

                <div className="single__check">
                    <AiOutlineCheck />
                </div>
                <div className="single__task-text">
                    EXAMPLEEXAMPLEEXAMPLEEXAMPLEEXAMPLEEXAMPLEEXAMPLEEXAMPLE
                </div>
            </div>
            <div className="task__link">
                <a href="">
                    Click me to go to an attachment
                </a>
            </div>
            <div className="task__duetime">
                17:00
            </div>
        </div>

    )
}