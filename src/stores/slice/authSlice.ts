import { createSlice } from '@reduxjs/toolkit'
import { isBrower } from 'maroonlis-utils'
import type { StoreState } from '../store'

export const authSlice = createSlice({
  name: 'auth',
  initialState: () => {
    if (isBrower()) {
      return {
        authState: !!localStorage.getItem('authslice'),
        authUser: ''
      }
    }

    return {
      authState: false,
      authUser: ''
    }
  },
  reducers: {
    setAuthState(state, action) {
      state.authState = action.payload

      localStorage.setItem('authslice', action.payload ? 'true' : '')
    },
    setAuthUser(state, action) {
      state.authUser = action.payload
    }
  }
})

export const { setAuthState, setAuthUser } = authSlice.actions
export const selectAuthState = (state: StoreState) => state.auth.authState
export const selectAuthUser = (state: StoreState) => state.auth.authUser
export default authSlice.reducer
