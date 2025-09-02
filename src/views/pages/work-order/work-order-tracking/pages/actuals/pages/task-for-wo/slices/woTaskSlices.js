import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedGroup: 'initial',
  visiblePopUp: false,
}

export const woTaskSlice = createSlice({
  name: 'woTask',
  initialState,
  reducers: {
    setSelectedAppIndex(state, action) {
      state.selectedAppIndex = action.payload
    },
    setSelectedAppAction(state, action) {
      state.selectedAppAction = action.payload
    },
    setSelectedGroup(state, action) {
      state.selectedGroup = action.payload
    },
    setSelectedAppIndexAndAction(state, action) {
      state.selectedAppIndex = action.payload?.index
      state.selectedAppAction = action.payload?.action
    },
    setVisiblePopUp(state, action) {
      state.visiblePopUp = action.payload
    },
    resetState() {
      return initialState
    },
  },
})

export const woTaskActions = woTaskSlice.actions

export default woTaskSlice.reducer
