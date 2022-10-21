import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { Check } from "../../Check/Check"
import { TbDotsVertical, TbStar } from "react-icons/tb"
import uniqid from "uniqid"

import "./NewModal.scss"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { addNewTask } from "../../../app/reducer/task"
export const NewModal = () => {
    const [isSpecial, setSpecial] = useState<boolean>(false)
    const [task, createTask] = useState<Task>({text: "", attachment:"", checked: false, order: 1} as Task)
    let isOpen = useSelector((state: RootState) => state.modals.list.createNew)
    let dispatch = useDispatch()
    const handleTask = (event:ChangeEvent<HTMLInputElement>) => {
        // if(event.key == "Enter") {
        //     dispatch(addNewTask(task))
        //     createTask({text: "", attachment: ""} as Task)
        // } else 
        createTask((prev)=> {
            let target = event.target as HTMLInputElement
            return {
                ...prev,
                [target.id as keyof Task]: target.value
            }
        })

    }

    const sendTask = (ev?:KeyboardEvent) => {
        if(ev?.key === "Enter") {

            
            dispatch(addNewTask({...task, id: uniqid()}))
            createTask({text: "", attachment: "", checked: false, order: task.order+1} as Task)
        } 
        if (!ev) {
            dispatch(addNewTask(task))
            createTask({text: "", attachment: "", checked: false, order: task.order+1} as Task)
        }
    }

    const handleDate = (ev: ChangeEvent<HTMLInputElement>) => {
        createTask(prev => { return { ...prev, due: new Date(ev.target.value!) } })
    }
    return (<>
        {isOpen && <div className="modal__wrap--new">

            <form>



                <div className="modal__task">
                    <Check task={task} />
                    <input value={task.text} id='text' onKeyUp={sendTask} onChange={handleTask} type="text" placeholder="Task" autoFocus />
                    <TbDotsVertical />
                    <TbStar className={isSpecial ? "fill" : ""} onClick={() => setSpecial((prev) => !prev)} />
                </div>
                <div className="modal__details">
                    <input value={task.attachment} id='attachment' onKeyUp={sendTask} onChange={handleTask} type="text" placeholder="Attachment" />
                    <div className="modal__date-time">

                        <input value={task.due?.toDateString()} onBlur={() => sendTask()} onChange={handleDate} type="datetime-local" id='due' />


                    </div>
                </div>

            </form>

        </div>}
    </>)
}