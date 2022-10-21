import "./SingleTask.scss"
import { AiOutlineLink } from "react-icons/ai"
import { MdOutlineDragHandle } from "react-icons/md"
import { Check } from "../Check/Check"
import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { changeOrder } from "../../app/reducer/task"
interface ISingleTask {
    task: Task
}
export const Single: FC<ISingleTask> = ({ task }) => {
    const tasks = useSelector((state: RootState) => state.tasks.list)
    const dispatch = useDispatch()
    const getTaskById = (id: string) => {
        return tasks.filter(single => single.id === id)[0]
    }
    const [isDragging, setDragging] = useState(false)
    const [t, setT] = useState(task)
    const [isOver, setOver] = useState(false)
    const handleDrag = (e: React.DragEvent) => {
        e.stopPropagation()
        setDragging(prev => !prev)
        e.dataTransfer.effectAllowed = "move"
        e.dataTransfer.setData("text", JSON.stringify({ id: task.id, order: task.order }))

        console.log(e.dataTransfer.types)

    }
    const handleDrop = (e: React.DragEvent) => {
        e.stopPropagation()
        let data = JSON.parse(e.dataTransfer.getData("text"))
        dispatch(changeOrder({ id: data.id, order: t.order }))
        dispatch(changeOrder({ id: t.id, order: data.order }))
        setOver(false)
        setDragging(false)

        return false

    }
    return (
        <div
            onDrop={handleDrop}
            onDragEnter={(e) => { e.preventDefault(); setOver(true) }}
            onDragLeave={(e) => { e.preventDefault(); setOver(false) }}
            onDragOver={(e) => { e.preventDefault() }}
            onDragStart={handleDrag}
            onDragEnd={handleDrag}
            draggable className={`single__wrap ${isDragging ? "single__wrap--dragging" : isOver ? "single__wrap--over" : ""}`}>
            <div className="single__content">

                <div className="single__main">

                    <Check task={task} />
                    <div className="single__task-text">
                        {task.text}
                    </div>

                </div>
                {task.attachment?.length! > 0 && (<div className="task__link">
                    <a href={task.attachment}>
                        <AiOutlineLink /> Click me to go to an attachment
                    </a>
                </div>)}
                {task.due && <div className="task__duetime">
                    {task.due?.toString()}
                </div>}
            </div>
            <MdOutlineDragHandle />
        </div>


    )
}