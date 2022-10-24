import "./SingleTask.scss"
import { AiOutlineLink } from "react-icons/ai"
import { MdOutlineDragHandle } from "react-icons/md"
import { Check } from "../Check/Check"
import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { changeOrder } from "../../app/reducer/task"
import { setDraggingElement } from "../../app/reducer/dragAndDrop"
interface ISingleTask {
    task: Task
}
export const Single: FC<ISingleTask> = ({ task }) => {
    const tasks = useSelector((state: RootState) => state.tasks.list)
    const dragEl = useSelector((state: RootState) => state.dnd.dragging)
    const dispatch = useDispatch()
    const getTaskById = (id: string) => {
        return tasks.filter(single => single.id === id)[0] || false
    }
    const [isDragging, setDragging] = useState(false)
    const [isOver, setOver] = useState(false)
    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setDragging(prev => !prev)
        dispatch(setDraggingElement(task?.id))


    }
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setOver(false)
        let target = e.target as HTMLDivElement
        let dragging = getTaskById(dragEl)
        let dropped = getTaskById(target?.id)
        let dragElement: HTMLDivElement | undefined
        let dropElement: HTMLDivElement | undefined
        let children = target.parentElement?.childNodes
        for (let i = 0; i < children?.length!; i++) {
            const element = children![i]

            let el = element as HTMLDivElement


            if (el?.id === dropped?.id) {
                dragElement = el
            }
            if (el?.id === dragging?.id) {
                dropElement = el
            }
        }

        let dragRect = dragElement?.getBoundingClientRect()!
        let dropRect = dropElement?.getBoundingClientRect()!
        let offset = e.clientY! - dragRect.top!
        let follDropI: number = 0
        children?.forEach((el, i) => {
            let element = el as HTMLDivElement
            if (element?.id === dragging!.id) {
                follDropI = i + 1
            }
        })


        let follEl = children![follDropI] as HTMLDivElement
        let foll = getTaskById(follEl?.id)
        if (offset > (dropRect.height / 2)) { //add on top
            dispatch(changeOrder({ order: dropped.order + 1, id: dragging?.id }))
            let counter = 1
            for (let i = 0; i < children?.length!; i++) {
                let curr = children![i] as HTMLDivElement
                let currTask = getTaskById(curr.id)

                if ((currTask.order >= dropped.order + 1) && currTask.id !== dragging.id && currTask.id !== foll.id) {
                    counter += 1
                    dispatch(changeOrder({ order: dropped.order + counter, id: curr.id }))
                }
            }
        }
        else {
            dispatch(changeOrder({ order: dropped.order, id: dragging?.id }))
            let counter = 0

            for (let i = 0; i < children?.length!; i++) {
                let curr = children![i] as HTMLDivElement
                let currTask = getTaskById(curr.id)

                if (currTask.order >= dropped.order && currTask.id !== dragging.id) {
                    counter += 1
                    dispatch(changeOrder({ order: dropped.order + counter, id: curr.id }))
                }
            }


        }


        setDragging(false)

        return false

    }
    const handleDragEnterLeave = (e: React.DragEvent) => {
        e.stopPropagation()
        e.preventDefault()


        if (e.type === "dragenter") {
            setOver(true)
        } else setOver(false)

    }
    return (
        <div
            id={task.id}
            onDrop={handleDrop}
            onDragEnter={handleDragEnterLeave}
            onDragLeave={handleDragEnterLeave}
            onDragOver={(e) => { e.stopPropagation(); e.preventDefault() }}
            onDragStart={handleDrag}
            onDragEnd={handleDrag}
            draggable className={`single__wrap ${isDragging ? "single__wrap--dragging" : isOver ? "single__wrap--over" : ""}`}>
            <div className="single__content">

                <div className="single__main">

                    <Check isChecked={task.checked!} id={task.id} />
                    <div className="single__task-text">
                        {task.text}, {task.order}
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