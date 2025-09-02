import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedPreventiveMaintenance: null,
  selectedFrequencySeasonal: null,
  visiblePopUp: false,
  selectedDetailTab: 0,
}

export const preventiveMaintenanceSlice = createSlice({
  name: 'preventiveMaintenances',
  initialState,
  reducers: {
    setSelectedAppIndex(state, action) {
      state.selectedAppIndex = action.payload
    },
    setSelectedAppAction(state, action) {
      state.selectedAppAction = action.payload
    },
    setSelectedPreventiveMaintenance(state, action) {
      state.selectedPreventiveMaintenance = action.payload
    },
    setSelectedFrequencySeasonal(state, action) {
      state.selectedFrequencySeasonal = action.payload
    },
    setSelectedAppIndexAndAction(state, action) {
      state.selectedAppIndex = action.payload?.index
      state.selectedAppAction = action.payload?.action
    },
    setVisiblePopUp(state, action) {
      state.visiblePopUp = action.payload
    },
    setSelectedDetailTab(state, action) {
      state.selectedDetailTab = action.payload
    },
    resetState() {
      return initialState
    },
  },
})

export const preventiveMaintenanceActions = preventiveMaintenanceSlice.actions

export default preventiveMaintenanceSlice.reducer
