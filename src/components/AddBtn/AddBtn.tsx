import { MdAddTask } from "react-icons/md"
import { TbDotsVertical } from "react-icons/tb"
import { useDispatch } from "react-redux"
import { handleModal } from "../../app/reducer/modal"
export const AddBtn = () => {
    const dispatch = useDispatch()
    const handleOpen = () => {
        dispatch(handleModal("createNew"))
    }
    return (<>
        <div className="add__wrap" onClick={handleOpen}>
            <div className="add__icon">
                <MdAddTask />
            </div>
            <span> Add new task </span>
            <div className="add__icon">
                <TbDotsVertical />
            </div>
        </div>
    </>)
}