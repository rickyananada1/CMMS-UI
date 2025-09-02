import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  refreshToggle: false,
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    triggerRefresh: (state) => {
      state.refreshToggle = !state.refreshToggle // Toggle to trigger refresh
    },
    resetState() {
      return initialState
    },
  },
})

export const tableActions = tableSlice.actions

export default tableSlice.reducer
