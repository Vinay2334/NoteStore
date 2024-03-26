import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import notesReducer from './slices/notesSlice';
import modalReducer from './slices/modalSlice';
import alertReducer from './slices/alertSlice';
import userProfileReducer from './slices/userProfileSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const store = configureStore({
    reducer: {
        authReducer,
        notesReducer,
        modalReducer,
        alertReducer,
        userProfileReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector