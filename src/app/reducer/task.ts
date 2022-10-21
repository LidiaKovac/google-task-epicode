import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState: TaskState = {
    list: []
};



export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {

        addNewTask: (state, action: PayloadAction<Task>) => {
            state.list.push(action.payload)
        },
        checkTask: (state, action: PayloadAction<string>) => {
            if (state.list.length > 0 && state.list[0].checked !== undefined) {
                state.list.filter((single) => {
                    return single.id === action.payload
                })[0].checked = true
            }
        },
        changeOrder: (state, action: PayloadAction<{ order: number, id: string }>) => {
            if (state.list.length > 0) {
                state.list.filter((single) => {
                    return single.id === action.payload.id
                })[0].order = action.payload.order
            }
        },


    },
});

export const { addNewTask, checkTask, changeOrder } = taskSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectQuery = (state: RootState) => state.query;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default taskSlice.reducer;