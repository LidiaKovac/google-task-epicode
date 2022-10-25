import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { list: ModalState } = {
    list: {
        createNew: false,
    }
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        handleModal: (state, action: PayloadAction<string>) => {
            state.list[action.payload as keyof ModalState] = !state.list[action.payload as keyof ModalState]
        }
    }
});

export const { handleModal } = modalSlice.actions;

export default modalSlice.reducer;