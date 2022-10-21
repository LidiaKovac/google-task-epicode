import { Single } from "../SingleTask/SingleTask"
import { AddBtn } from "../AddBtn/AddBtn"
import "./AllTasks.scss"
import { NewModal } from "../Modals/NewModal/NewModal"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
export const AllTasks = () => {
    const tasks = useSelector((state: RootState) => state.tasks.list)
    return (<>
        <div className="all__wrap">
            <AddBtn />
            <div className="all__tasks">
                {
                    [...tasks].sort((a, b) => a.order - b.order ).map((task, i) => <Single key={i} task={task} />)
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