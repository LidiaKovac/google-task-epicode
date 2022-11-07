import { AiOutlineLink } from "react-icons/ai"
import { MdOutlineDragHandle } from "react-icons/md"
import moment from "moment"
import { Check } from "../Check/Check"
import React, { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { addAllTasks, changeOrder } from "../../app/reducer/task"
import { setDraggingElement } from "../../app/reducer/dragAndDrop"
import { editTask, getAllTasks } from "../../app/API"
interface ISingleTask {
    task: Task
}
export const Single: FC<ISingleTask> = ({ task }) => {
    const dispatch = useDispatch()

    const tasks = useSelector((state: RootState) => state.tasks.byDate)
    const dragEl = useSelector((state: RootState) => state.dnd.dragging)

    const [edited, setEdited] = useState("")
    const [isOver, setOver] = useState(false)
    const [isDisabled, setDisabled] = useState(true)
    const [isDragging, setDragging] = useState(false)

    useEffect(() => {
        isDragging === false && getAllTasks().then(found => {
            dispatch(addAllTasks(found))
        })
    }, [isDragging])

    const getTaskById = (id: string) => {
        let found = {} as Task
        for (const key in tasks) {
            if (Object.prototype.hasOwnProperty.call(tasks, key)) {
                const date = tasks[key];
                let foundIndex = date.findIndex(task => task._id === id)
                if (foundIndex !== -1) {
                    found = date[foundIndex]
                    break
                }
            }
        }
        return found
    }
    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setDragging(prev => !prev)
        dispatch(setDraggingElement(task?._id))
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
            if (el?.id === dropped?._id) {
                dragElement = el
            }
            if (el?.id === dragging?._id) {
                dropElement = el
            }
        }

        let dragRect = dragElement?.getBoundingClientRect()!
        let dropRect = dropElement?.getBoundingClientRect()!
        let offset = e.clientY! - dragRect.top!
        let follDropI: number = 0
        children?.forEach((el, i) => {
            let element = el as HTMLDivElement
            if (element?.id === dragging!._id) {
                follDropI = i + 1
            }
        })

        let follEl = children![follDropI] as HTMLDivElement
        let foll = getTaskById(follEl?.id)
        if (offset > (dropRect.height / 2)) { //add on top
            editTask(dragging._id, { order: dropped.order + 1 })
            dispatch(changeOrder({ order: dropped.order + 1, id: dragging?._id }))
            let counter = 1
            for (let i = 0; i < children?.length!; i++) {
                let curr = children![i] as HTMLDivElement
                let currTask = getTaskById(curr.id)
                if ((currTask.order >= dropped.order + 1) && currTask._id !== dragging._id && currTask._id !== foll._id) {
                    counter += 1
                    editTask(curr.id, { order: dropped.order + counter })
                    dispatch(changeOrder({ order: dropped.order + counter, id: curr.id }))
                }
            }
        }
        else {
            editTask(dragging._id, { order: dropped.order })
            dispatch(changeOrder({ order: dropped.order, id: dragging?._id }))
            let counter = 0
            for (let i = 0; i < children?.length!; i++) {
                let curr = children![i] as HTMLDivElement
                let currTask = getTaskById(curr.id)
                if (currTask.order >= dropped.order && currTask._id !== dragging._id) {
                    counter += 1
                    editTask(curr.id, { order: dropped.order + counter })
                    dispatch(changeOrder({ order: dropped.order + counter, id: curr.id }))
                }
            }
        }
        setDragging(false)
    }
    const handleEdit = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        ev.stopPropagation()
        let target = ev.target as HTMLInputElement
        setEdited(target.value)
        if (ev.key === "Enter") {
            editTask(task._id, { ...task, text: target.value }).then((res)=> {
                setDisabled(true)
                setEdited("")
                dispatch(addAllTasks(res))
            })
        }
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
            id={task._id}
            onDrop={handleDrop}
            onDragEnter={handleDragEnterLeave}
            onDragLeave={handleDragEnterLeave}
            onDragOver={(e) => {
                e.stopPropagation();
                e.preventDefault()
            }}
            onDragStart={handleDrag}
            onDragEnd={handleDrag}
            draggable className={`single__wrap ${isDragging ? "single__wrap--dragging" : isOver ? "single__wrap--over" : ""} ${task.checked ? "task--checked" : ""}`}>
            <div className="single__content">
                <div className="single__main" >
                    <Check isChecked={task.checked!} id={task._id} />
                    {isDisabled ? <div onClick={() => setDisabled(false)}> {task.text} </div> :
                        <input onBlur={() => { setDisabled(true); editTask(task._id, { text: edited }) }} onKeyUp={handleEdit} defaultValue={task.text} className="single__task-text" disabled={isDisabled} />
                    }

                </div>
                {task.attachment?.length! > 0 && (<div className="task__link">
                    <a href={task.attachment}>
                        <AiOutlineLink /> Click me to go to an attachment
                    </a>
                </div>)}
                {task.due && <div className={`${task.isExpired ? "task__date--expired" : ""} task__duetime `}>
                    {moment(task.due).format("DD/MM") || ""}
                </div>}
            </div>
            <MdOutlineDragHandle />
        </div>
    )
}