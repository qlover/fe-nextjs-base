import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { authSlice } from './slice'

const RootReducer = {
  [authSlice.name]: authSlice.reducer
}

const makeStore = () =>
  configureStore({
    reducer: RootReducer,
    devTools: true
  })

export const storeWrapper = createWrapper(makeStore)

export type StoreInstance = ReturnType<typeof makeStore>
export type StoreState = ReturnType<StoreInstance['getState']>
