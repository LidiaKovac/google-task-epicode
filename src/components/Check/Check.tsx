import { AiOutlineCheck } from "react-icons/ai"
import { useState, useEffect, FC } from "react"
import { useDispatch } from "react-redux"
import { addAllTasks, checkTask } from "../../app/reducer/task"
import { editTask, getAllTasks } from "../../app/API"
export const Check: FC<{ isChecked: boolean, id: string }> = ({ isChecked, id }) => {
    const dispatch = useDispatch()
    const handleCheck = () => {
        dispatch(checkTask({ id, isChecked: !isChecked }))
        editTask(id, {checked: !isChecked}).then(newTasks => {
            setTimeout(()=> {
                dispatch(addAllTasks(newTasks as TaskState))
            }, 300)
        })
    }
    useEffect(() => {
    }, [isChecked])
    return (<>
        <div onClick={handleCheck} className={`single__check ${isChecked && "single__check--active"}`} >
            <AiOutlineCheck />
        </div> </>)
}