import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState: DnDState = {
    dragging: ""
};



export const dNdSlice = createSlice({
    name: 'dnd',
    initialState,
    reducers: {

        setDraggingElement: (state, action: PayloadAction<string>) => {
            state.dragging = action.payload
        },


    },
});

export const { setDraggingElement } = dNdSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectQuery = (state: RootState) => state.query;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default dNdSlice.reducer;