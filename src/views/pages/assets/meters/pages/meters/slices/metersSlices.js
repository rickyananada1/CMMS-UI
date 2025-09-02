import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedMeter: null,
  selectedMeterGroup: null,
  selectedMenu: 'Meter',
  visiblePopUp: false,
  deleteType: 'Meter',
}

export const metersSlice = createSlice({
  name: 'meters',
  initialState,
  reducers: {
    setSelectedAppIndex(state, action) {
      state.selectedAppIndex = action.payload
    },
    setSelectedAppAction(state, action) {
      state.selectedAppAction = action.payload
    },
    setSelectedMeter(state, action) {
      state.selectedMeter = action.payload
    },
    setSelectedMeterGroup(state, action) {
      state.selectedMeterGroup = action.payload
    },
    setSelectedAppIndexAndAction(state, action) {
      state.selectedAppIndex = action.payload?.index
      state.selectedAppAction = action.payload?.action
    },
    setSelectedAppIndexMenuAndAction(state, action) {
      state.selectedAppIndex = action.payload?.index
      state.selectedMenu = action.payload?.menu
      state.selectedAppAction = action.payload?.action
    },
    setVisiblePopUp(state, action) {
      state.visiblePopUp = action.payload
    },
    setSelectedMenu(state, action) {
      state.selectedMenu = action.payload
    },
    setDeleteType(state, action) {
      state.deleteType = action.payload
    },
    setDeleteTypeAndVisiblePopUp(state, action) {
      state.deleteType = action?.payload?.deleteType
      state.visiblePopUp = action?.payload?.visiblePopUp
    },
    resetState() {
      return initialState
    },
  },
})

export const metersActions = metersSlice.actions

export default metersSlice.reducer
