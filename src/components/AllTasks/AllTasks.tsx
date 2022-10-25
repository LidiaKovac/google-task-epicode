import { Single } from "../SingleTask/SingleTask"
import { useEffect } from "react"
import "./AllTasks.scss"
import { NewModal } from "../Modals/NewModal/NewModal"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { getAllTasks } from "../../app/API"
import { addAllTasks } from "../../app/reducer/task"
import { setLoading } from "../../app/reducer/loading"
import { ColorRing } from "react-loader-spinner"
export const AllTasks = () => {
    const dispatch = useDispatch()
    const tasks = useSelector((state: RootState) => state.tasks.list)
    const loading = useSelector((state: RootState) => state.loading.loading)
    useEffect(() => {
        dispatch(setLoading(true))
        getAllTasks().then(found => {
            dispatch(addAllTasks(found))
            dispatch(setLoading(false))
        })
    }, [])
    return (<>
        {loading ? <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        /> : <div className="all__wrap">

            <div className="all__tasks">
                {
                    tasks.map((task, i) => <Single key={i} task={task} />)
                }
            </div>
            <NewModal />
        </div>}



    </>)
}