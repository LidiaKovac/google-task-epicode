import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import modal from './reducer/modal';
import task from './reducer/task';

export const store = configureStore({
  reducer: {
    modals: modal,
    tasks: task
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
