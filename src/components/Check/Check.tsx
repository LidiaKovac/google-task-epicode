import "./Check.scss"
import { AiOutlineCheck } from "react-icons/ai"
import {useState, useEffect, FC} from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkTask } from "../../app/reducer/task"
import { RootState } from "../../app/store"
export const Check:FC<{task: Task}> = ({task}) => {
    const [checked,setChecked] = useState<boolean>(task?.checked || false)
    const dispatch = useDispatch()
    const prevTask = useSelector((state:RootState)=> state.tasks.list.filter(single => single.id === task.id)[0])
    useEffect(()=> {
        if(checked !== prevTask?.checked)  dispatch(checkTask(task?.id))
    }, [checked])
    return (<>
        <div onClick={()=> setChecked((prev)=> {return !prev})} className={`single__check ${checked && "single__check--active"}`} >
            <AiOutlineCheck />
        </div> </>)
}