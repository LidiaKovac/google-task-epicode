import "./Check.scss"
import { AiOutlineCheck } from "react-icons/ai"
import {useState, useEffect, FC} from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkTask } from "../../app/reducer/task"
export const Check:FC<{isChecked: boolean, id:string}> = ({isChecked, id}) => {
    const [checked,setChecked] = useState<boolean | undefined>(isChecked)
    const dispatch = useDispatch()
    const handleCheck = () => {
        dispatch(checkTask({id, isChecked: checked!}))
        setChecked(p => !p)
    }
    useEffect(()=> {
    }, [checked])
    return (<>
        <div onClick={handleCheck} className={`single__check ${checked && "single__check--active"}`} >
            <AiOutlineCheck />
        </div> </>)
}