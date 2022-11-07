import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TaskState = {
    byDate: {},
    count: 0,
    foundById: {} as Task
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {

        addAllTasks: (state, action: PayloadAction<TaskState>) => {
            
            state.byDate = action.payload.byDate
            state.count = action.payload.count
        },
        getTaskById: (state, action:PayloadAction<string>) => {
            let found = {} as Task
            for (const key in state.byDate) {
                if (Object.prototype.hasOwnProperty.call(state.byDate, key)) {
                    const date = state.byDate[key];
                    let foundIndex = date.findIndex(task => task._id === action.payload)
                    if (foundIndex !== -1) {
                        found = date[foundIndex]
                        state.foundById = found
                    }
                }
            }
        },
        // addNewTask: (state, action: PayloadAction<Task>) => {
        //     state.list.push({ ...action.payload, order: state.list.length })
        // },
        checkTask: (state, action: PayloadAction<{ isChecked: boolean, id: string }>) => {
            for (const key in state.byDate) {
                if (Object.prototype.hasOwnProperty.call(state.byDate, key)) {
                    const date = state.byDate[key];
                    let foundIndex = date.findIndex(task => task._id === action.payload.id)
                    if (foundIndex !== -1) {
                        date[foundIndex].checked = action.payload.isChecked
                    }
                }
            }
            
        },
        changeOrder: (state, action: PayloadAction<{ order: number, id: string }>) => {
            for (const key in state.byDate) {
                if (Object.prototype.hasOwnProperty.call(state.byDate, key)) {
                    const date = state.byDate[key];
                    let foundIndex = date.findIndex(task => task._id === action.payload.id)
                    if (foundIndex !== -1) {
                        date[foundIndex].order = action.payload.order
                    }
                }
            }
            
        }
    }
});

export const { getTaskById, checkTask, changeOrder, addAllTasks } = taskSlice.actions;

export default taskSlice.reducer;