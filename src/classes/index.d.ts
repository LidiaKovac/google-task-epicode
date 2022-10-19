class ModalState {

    createNew: boolean

}

class TaskState {
    list: Task[]
}

class Task {
    text: string
    attachment?: string
    due?: Date
}