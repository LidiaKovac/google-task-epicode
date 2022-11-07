import { Single } from "../SingleTask/SingleTask"
import { useEffect } from "react"
import { NewModal } from "../Modals/NewModal/NewModal"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { getAllTasks } from "../../app/API"
import { addAllTasks } from "../../app/reducer/task"
import { setLoading } from "../../app/reducer/loading"
import { ColorRing } from "react-loader-spinner"
export const AllTasks = () => {
    const dispatch = useDispatch()
    const tasks = useSelector((state: RootState) => state.tasks)
    const loading = useSelector((state: RootState) => state.loading.loading)
    useEffect(() => {
        dispatch(setLoading(true))
        getAllTasks().then(found => {
            dispatch(addAllTasks(found))
            dispatch(setLoading(false))
        })
        console.log(tasks)
    }, [])

    return (<>
        {loading ? <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#008744', '#0057e7', '#d62d20', '#ffa700', '#ffffff']}
        /> : <div className="all__wrap">

            <div className="all__tasks">
                {
                    /*
                        the byDate prop is not an array, it's an object of all the different dates for which we have tasks
                        Object.keys return an aray of object props, that we can lopo using map
                        */
                    Object.keys(tasks.byDate).map((key,i) => {
                        return <div key={i}> <h3 style={key === "expired" ? {color: "red"} : {}}> {key.replaceAll("_", " ")} </h3>
                            {tasks.byDate[key].map((task, i) => <Single key={i} task={task} />)}
                        </div>

                    })

                }
            </div>
            <NewModal />
        </div>}



    </>)
}