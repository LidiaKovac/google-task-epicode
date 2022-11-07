import moment from "moment"
export const getAllTasks = async () => {
    try {
        let raw = await fetch(process.env.REACT_APP_API_URI!)
        let tasks = await raw.json()
        // for (const prop in tasks) {
        //     if (Object.prototype.hasOwnProperty.call(tasks, prop) && prop !== "count") {
        //         const byDate = tasks[prop]; //byDate
        //         for (const date in byDate) {
        //             if (Object.prototype.hasOwnProperty.call(byDate, date)) {
        //                 const taskArray = byDate[date];
        //                 console.log(byDate)
        //                 taskArray.forEach((task: Task) => {
        //                     if (task.due?.length! > 0) {
        //                         task.due = moment(task.due).format("DD/MM")
        //                     }
        //                     console.log(task.due)
        //                 });

        //             }
        //         }
        //     }
        // }
        return tasks
    } catch (error) {
        console.log(error)
    }
}

export const createNewTask = async (body: Task) => {
    try {
        let raw = await fetch(process.env.REACT_APP_API_URI!, {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        return await raw.json()
    } catch (error) {
        console.log(error)
    }

}

export const editTask = async (id: string, body: {}) => {
    let res
    try {
        let raw = await fetch(process.env.REACT_APP_API_URI! + "/" + id, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        res = await getAllTasks()
    } catch (error) {
        console.log(error)
    }
    return res
}