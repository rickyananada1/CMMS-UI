import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedConditionMonitoring: null,
  visiblePopUp: false,
}

export const conditionMonitoringSlice = createSlice({
  name: 'conditionMonitoring',
  initialState,
  reducers: {
    setSelectedAppIndex(state, action) {
      state.selectedAppIndex = action.payload
    },
    setSelectedAppAction(state, action) {
      state.selectedAppAction = action.payload
    },
    setSelectedConditionMonitoring(state, action) {
      state.selectedConditionMonitoring = action.payload
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

export const conditionMonitoringActions = conditionMonitoringSlice.actions

export default conditionMonitoringSlice.reducer
