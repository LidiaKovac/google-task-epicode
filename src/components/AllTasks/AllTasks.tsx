import { Single } from "../SingleTask/SingleTask"
import { AddBtn } from "../AddBtn/AddBtn"
import {useState, useEffect} from "react"
import "./AllTasks.scss"
import { NewModal } from "../Modals/NewModal/NewModal"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
export const AllTasks = () => {
    const tasks = useSelector((state: RootState) => state.tasks.list)
    const [sorted, setSorted] = useState<Task[]>(tasks)
    // const getSorted = (list:Task[]) => {
    //     return [...list].sort((a, b) => a.order - b.order )
    // }
    // useEffect(()=> {
    //     setSorted(getSorted(tasks))
    // }, [tasks])
    return (<>
        <div className="all__wrap">
            
            <div className="all__tasks">
                {
                    tasks.map((task, i) => <Single key={i} task={task} />)
                }
                {/* <Single />
                <Single />
                <Single />
                <Single />
                <Single />
                <Single />
                <Single /> */}

            </div>
            <NewModal />
        </div>

    </>)
}