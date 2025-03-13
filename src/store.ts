import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/auth-slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const createStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
  })

export const store = createStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
