import { localUserInfo } from '@/utils/client/Storage'
import { createSlice } from '@reduxjs/toolkit'
import { isBrower } from 'maroonlis-utils'
import type { StoreState } from '../store'

export const authSlice = createSlice({
  name: 'auth',
  initialState: () => {
    if (isBrower()) {
      return {
        authState: false,
        authUser: localUserInfo.get<Stores.AuthState['authUser']>({
          name: '',
          id: 0,
          money: 0
        })
      } as Stores.AuthState
    }

    return {
      authState: false,
      authUser: ''
    } as Stores.AuthState
  },
  reducers: {
    setAuthState(state, action) {
      state.authState = action.payload
    },
    setAuthUser(state, action) {
      state.authUser = { ...state.authUser, ...action.payload }

      localUserInfo.set(action.payload)
    }
  }
})

export const { setAuthState, setAuthUser } = authSlice.actions
export const selectAuthState = (state: StoreState) => state.auth.authState
export const selectAuthUser = (state: StoreState) => state.auth.authUser
export default authSlice.reducer
