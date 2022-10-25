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
        }
    },
});

export const { setDraggingElement } = dNdSlice.actions;

export default dNdSlice.reducer;