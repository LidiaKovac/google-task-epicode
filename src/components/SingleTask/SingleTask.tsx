import "./SingleTask.scss"
import { AiOutlineLink } from "react-icons/ai"
import { Check } from "../Check/Check"
import { FC } from "react"
interface ISingleTask {
    task: Task
}
export const Single: FC<ISingleTask> = ({ task }) => {
    return (
        <div className="single__wrap">
            <div className="single__main">

                <Check />
                <div className="single__task-text">
                    {task.text}
                </div>
            </div>
            {task.attachment?.length! > 0 && <div className="task__link">
                <a href={task.attachment}>
                    <AiOutlineLink /> Click me to go to an attachment
                </a>
            </div>}
            {task.due && <div className="task__duetime">
                {task.due?.toString()}
            </div>}
        </div>

    )
}