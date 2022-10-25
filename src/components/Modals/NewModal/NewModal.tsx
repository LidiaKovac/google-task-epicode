import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { Check } from "../../Check/Check"
import { TbDotsVertical, TbStar } from "react-icons/tb"
import uniqid from "uniqid"

import "./NewModal.scss"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { addNewTask } from "../../../app/reducer/task"
import moment from "moment"
export const NewModal = () => {
    const [isSpecial, setSpecial] = useState<boolean>(false)
    const [task, createTask] = useState<Task>({ text: "", attachment: "", checked: false, order: 1 } as Task)
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


            dispatch(addNewTask({ ...task, id: uniqid() }))
            createTask({ text: "", attachment: "", checked: false } as Task)
        }
        if (!ev) {
            dispatch(addNewTask(task))
            createTask({ text: "", attachment: "", checked: false } as Task)
        }
    }

    const handleDate = (ev: ChangeEvent<HTMLInputElement>) => {
        let date = moment(new Date(ev.target.value!)).format("Do-MMM hh:mm")
        createTask(prev => { return { ...prev, due: date } })
    }
    return (<>
        {isOpen && (<div className="modal__wrap--new">





            <div className="modal__task">
                <Check isChecked={task.checked!} id={task.id} />
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