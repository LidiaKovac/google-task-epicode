import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TaskState = {
    list: []
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addAllTasks: (state, action: PayloadAction<Task[]>) => {
            state.list = action.payload
        },
        addNewTask: (state, action: PayloadAction<Task>) => {
            state.list.push({ ...action.payload, order: state.list.length })
        },
        checkTask: (state, action: PayloadAction<{ isChecked: boolean, id: string }>) => {
            if (state.list.length > 0 && state.list[0].checked !== undefined) {
                state.list.filter((single) => {
                    return single._id === action.payload.id
                })[0].checked = action.payload.isChecked
            }
        },
        changeOrder: (state, action: PayloadAction<{ order: number, id: string }>) => {
            if (state.list.length > 0) {
                state.list.filter((single) => {
                    return single._id === action.payload.id
                })[0].order = action.payload.order
            }
        }
    }
});

export const { addNewTask, checkTask, changeOrder, addAllTasks } = taskSlice.actions;

export default taskSlice.reducer;