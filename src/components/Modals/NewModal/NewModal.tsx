import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { Check } from "../../Check/Check"
import { TbDotsVertical, TbStar } from "react-icons/tb"

import "./NewModal.scss"
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react"
import { handleModal } from "../../../app/reducer/modal"
import { addNewTask } from "../../../app/reducer/task"
export const NewModal = () => {
    const [isSpecial, setSpecial] = useState<boolean>(false)
    const [task, createTask] = useState<Task>({
        text: "",
    })
    let isOpen = useSelector((state: RootState) => state.modals.list.createNew)
    let dispatch = useDispatch()
    const submitForm = (ev: KeyboardEvent<HTMLInputElement>) => {
        let input = ev.currentTarget
        if (input.id === "attachment" && input.value.match(new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi))) {
            createTask(prev => { return { ...prev, [input.id]: input.value } })
        } else if(input.id !=="attachment") {
            createTask(prev => { return { ...prev, [input.id]: input.value } })

        }
        if (ev.key === "Enter") input.closest("form")?.requestSubmit()
    }
    const handleForm = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        // console.log({ d: ev.target, ct: ev.currentTarget })
        // if (ev.key === "Enter") {
            dispatch(addNewTask(task as Task))
        // }
    }
    const handleDate = (ev: ChangeEvent<HTMLInputElement>) => {
        createTask(prev => { return { ...prev, due: ev.target.valueAsDate! } })
    }
    return (<>
        {isOpen && <div className="modal__wrap--new">

            <form onSubmit={handleForm}>



                <div className="modal__task">
                    <Check />
                    <input id='text' onKeyUp={(ev) => submitForm(ev)} type="text" placeholder="Task" autoFocus />
                    <TbDotsVertical />
                    <TbStar className={isSpecial ? "fill" : ""} onClick={() => setSpecial((prev) => !prev)} />
                </div>
                <div className="modal__details">
                    <input id='attachment' onKeyUp={(ev) => submitForm(ev)} type="text" placeholder="Attachment" />
                    <div className="modal__date-time">

                        <input onChange={handleDate} type="datetime-local" id='due' />


                    </div>
                </div>

            </form>

        </div>}
    </>)
}