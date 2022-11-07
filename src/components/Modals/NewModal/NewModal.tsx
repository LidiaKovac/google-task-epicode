import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import moment from "moment"
import { Check } from "../../Check/Check"
import { TbDotsVertical, TbStar } from "react-icons/tb"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { addAllTasks } from "../../../app/reducer/task"
import { createNewTask, getAllTasks } from "../../../app/API"

export const NewModal = () => {
    const [isSpecial, setSpecial] = useState<boolean>(false)
    const tasks = useSelector((state: RootState) => state.tasks)
    const [task, createTask] = useState<Task>({ text: "", attachment: "", checked: false, order: tasks.count + 1, due: "" } as Task)
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
            createNewTask(task).then(()=> getAllTasks()).then(res => dispatch(addAllTasks(res)))
            createTask({ text: "", attachment: "", checked: false, order: tasks.count + 1, due: "" } as Task)
        }
        if (!ev && task.text.length > 0) {
            createNewTask(task).then(()=> getAllTasks()).then(res => dispatch(addAllTasks(res)))
            createTask({ text: "", attachment: "", checked: false, order: tasks.count + 1, due: "" } as Task)
        }
    }

    const handleDate = (ev: ChangeEvent<HTMLInputElement>) => {
        let date = new Date(ev.target.value!).toISOString()
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
                    <input value={moment(task.due).format("yyyy-MM-DD")} onBlur={() => sendTask()} onChange={handleDate} type="date" id='due' />
                </div>
            </div>
        </div>)}
    </>)
}