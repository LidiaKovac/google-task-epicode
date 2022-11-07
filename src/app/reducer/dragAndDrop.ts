import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: DnDState = {
    dragging: "",
    isDragging: null
};

export const dNdSlice = createSlice({
    name: 'dnd',
    initialState,
    reducers: {
        setDraggingElement: (state, action: PayloadAction<string>) => {
            state.dragging = action.payload
        },
        setIsDragging: (state, action: PayloadAction<boolean>) => {
            state.isDragging = action.payload
        }
    },
});

export const { setDraggingElement, setIsDragging } = dNdSlice.actions;

export default dNdSlice.reducer;