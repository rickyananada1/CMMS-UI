import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  permissions: [],
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setNecessaryUserData(state, action) {
      state.user = { ...state.user, ...action.payload }
    },
    setPermissions(state, action) {
      state.permissions = action.payload
    },
    resetState() {
      return initialState
    },
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
