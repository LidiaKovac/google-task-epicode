import "./SingleTask.scss"
import { AiOutlineLink } from "react-icons/ai"
import { MdOutlineDragHandle } from "react-icons/md"
import { Check } from "../Check/Check"
import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { changeOrder } from "../../app/reducer/task"
import { Root } from "react-dom/client"
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
    const [t, setT] = useState(task)
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
            // const offset = y - box.top - box.height / 2
            // y = dragging.clientY

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
        let prevDropI: number = 0
        let follDropI: number = 0
        children?.forEach((el, i) => {
            let element = el as HTMLDivElement
            if (element?.id === dragging!.id) {
                prevDropI = i - 1
                follDropI = i + 1
            }
        })

        // let prevEl = children![prevDropI] as HTMLDivElement
        // let prev = getTaskById(prevEl!.id)
        let follEl = children![follDropI] as HTMLDivElement
        let foll = getTaskById(follEl?.id)
        console.log(offset, dropRect.height / 2);
        console.log(target)
        if (offset > (dropRect.height / 2)) { //add on top
            console.log("bot")
            dispatch(changeOrder({ order: dropped.order + 1, id: dragging?.id }))
            let counter = 1
            for (let i = 0; i < children?.length!; i++) {
                let curr = children![i] as HTMLDivElement
                let currTask = getTaskById(curr.id)

                if ((currTask.order >= dropped.order + 1) && currTask.id !== dragging.id && currTask.id !== foll.id) {
                    console.log("incrementing", curr);
                    counter += 1
                    dispatch(changeOrder({ order: dropped.order + counter, id: curr.id }))
                }
            }
        }
        else {
            console.log("top")
            dispatch(changeOrder({ order: dropped.order, id: dragging?.id }))
            console.log(dropped.order)
            let counter1 = 0
            let counter2 = 0
            console.log("start")
            for (let i = 0; i < children?.length!; i++) {
                let curr = children![i] as HTMLDivElement
                let currTask = getTaskById(curr.id)
                console.log(currTask.order, dropped.order);

                if (currTask.order >= dropped.order && currTask.id !== dragging.id) {
                    console.log("incrementing", curr);
                    counter1 += 1
                    dispatch(changeOrder({ order: dropped.order + counter1, id: curr.id }))
                } else if (currTask.order <= dropped.order) {
                    counter2 += 1
                    // dispatch(changeOrder({ order: dropped.order + counter2, id: curr.id }))

                }
            }
            // dispatch(changeOrder({ order: dropped.order, id: dragging?.id }))
            // dispatch(changeOrder({ order: dropped.order + 1, id: foll?.id }))

        }

        // dispatch(changeOrder({ id: data.id, order: t.order }))
        // let target = e.target as HTMLDivElement
        // target.parentElement?.childNodes.forEach((el, i) => {
        //     let element = el as HTMLDivElement
        //     console.log(element.id, "order:", i);
        //     if (data.id !== element.id) dispatch(changeOrder({ id: element.id, order: i }))
        // });

        // dispatch(changeOrder({ id: t.id, order: data.order }))
        setDragging(false)

        return false

    }
    const handleDragEnterLeave = (e: React.DragEvent) => {
        e.stopPropagation()
        e.preventDefault()

        // let relTarget = e.relatedTarget as HTMLDivElement
        // let sourceEl, targetEl,currentY
        // sourceEl = target.getBoundingClientRect()
        // targetEl = relTarget.getBoundingClientRect()
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