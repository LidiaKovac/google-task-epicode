export const getAllTasks = async () => {
    try {
        let raw = await fetch(process.env.REACT_APP_API_URI!)
        return await raw.json()

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
    try {
        let raw = await fetch(process.env.REACT_APP_API_URI! + "/" + id, {
            method: "PUT",
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