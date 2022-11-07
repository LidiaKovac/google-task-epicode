class ModalState {

    createNew: boolean

}

class loadingState {
    loading: boolean
}

class TaskState {
    byDate: {
        [field:string]: Task[]
    }
    count: number
    foundById?: Task
}

class DnDState {
    dragging: string
    isDragging: boolean | null
}

class Task {
    text: string
    attachment?: string
    due?: string
    checked?: boolean
    _id: string
    order: number
    isExpired: boolean
    constructor(text:string, attachment:string,due:Date, checked:boolean = false, id:string, order: number) {
        this.text = text
        this.attachment = attachment
        this.due = due
        this.checked = checked
        this.id = id
        this.order = order
    }
    
}