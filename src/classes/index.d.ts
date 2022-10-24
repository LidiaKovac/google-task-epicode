class ModalState {

    createNew: boolean

}

class TaskState {
    list: Task[]
}

class Task {
    text: string
    attachment?: string
    due?: string
    checked?: boolean
    id: string
    order: number
    constructor(text:string, attachment:string,due:Date, checked:boolean = false, id:string, order: number) {
        this.text = text
        this.attachment = attachment
        this.due = due
        this.checked = checked
        this.id = id
        this.order = order
    }
    
}