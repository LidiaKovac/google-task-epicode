import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { Check } from "../../Check/Check"
import { TbDotsVertical, TbStar } from "react-icons/tb"
import uniqid from "uniqid"

import "./NewModal.scss"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { addAllTasks } from "../../../app/reducer/task"
import moment from "moment"
import { createNewTask } from "../../../app/API"
export const NewModal = () => {
    const [isSpecial, setSpecial] = useState<boolean>(false)
    const tasks = useSelector((state: RootState) => state.tasks.list)
    const [task, createTask] = useState<Task>({ text: "", attachment: "", checked: false, order: tasks.length + 1, due: moment(new Date()).format("Do-MMM hh:mm") } as Task)
    let isOpen = useSelector((state: RootState) => state.modals.list.createNew)
    let dispatch = useDispatch()
    const handleTask = (event: ChangeEvent<HTMLInputElement>) => {
        createTask((prev) => {
            let target = event.target as HTMLInputElement
            return {
                ...prev,
                [target.id as keyof Task]: target.value
            }
        })
    }
    const sendTask = (ev?: KeyboardEvent) => {
        if (ev?.key === "Enter") {
            createNewTask(task).then(res => dispatch(addAllTasks(res)))
            createTask({ text: "", attachment: "", checked: false, order: tasks.length } as Task)
        }
        if (!ev) {
            createNewTask(task).then(res => dispatch(addAllTasks(res)))
            createTask({ text: "", attachment: "", checked: false, order: tasks.length } as Task)
        }
    }
    const handleDate = (ev: ChangeEvent<HTMLInputElement>) => {
        let date = moment(new Date(ev.target.value!)).format("Do-MMM hh:mm")
        createTask(prev => { return { ...prev, due: date } })
    }
    return (<>
        {isOpen && (<div className="modal__wrap--new">
            <div className="modal__task">
                <Check isChecked={task.checked!} id={task._id} />
                <input value={task.text} id='text' onKeyUp={sendTask} onChange={handleTask} type="text" placeholder="Task" autoFocus />
                <TbDotsVertical />
                <TbStar className={isSpecial ? "fill" : ""} onClick={() => setSpecial((prev) => !prev)} />
            </div>
            <div className="modal__details">
                <input value={task.attachment} id='attachment' onKeyUp={sendTask} onChange={handleTask} type="text" placeholder="Attachment" />
                <div className="modal__date-time">
                    <input value={task.due} onBlur={() => sendTask()} onChange={handleDate} type="datetime-local" id='due' />
                </div>
            </div>
        </div>)}
    </>)
}