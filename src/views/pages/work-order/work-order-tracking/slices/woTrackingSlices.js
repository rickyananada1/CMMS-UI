import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedWorkOrder: null,
  visiblePopUp: false,
  selectedPlanTab: 0,
  selectedActualTab: 0,
}

export const woTrackingSlice = createSlice({
  name: 'woTracking',
  initialState,
  reducers: {
    setSelectedAppIndex(state, action) {
      state.selectedAppIndex = action.payload
    },
    setSelectedAppAction(state, action) {
      state.selectedAppAction = action.payload
    },
    setSelectedWorkOrder(state, action) {
      state.selectedWorkOrder = action.payload
    },
    setSelectedAppIndexAndAction(state, action) {
      state.selectedAppIndex = action.payload?.index
      state.selectedAppAction = action.payload?.action
    },
    setVisiblePopUp(state, action) {
      state.visiblePopUp = action.payload
    },
    setSelectedPlanTab(state, action) {
      state.selectedPlanTab = action.payload
    },
    setSelectedActualTab(state, action) {
      state.selectedActualTab = action.payload
    },
    resetState() {
      return initialState
    },
  },
})

export const woTrackingActions = woTrackingSlice.actions

export default woTrackingSlice.reducer
