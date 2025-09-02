import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedWorkOrder: null,
  visiblePopUp: false,
  selectedDetailTab: 0,
  selectedTask: null,
  selectedLabor: null,
  selectedMaterial: null,
  selectedTool: null,
  selectedFailure: null,
  selectedFailureCauses: null,
  detailFailureVisible: false,
}

export const quickReportingSlice = createSlice({
  name: 'quickReporting',
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
    setSelectedDetailTab(state, action) {
      state.selectedDetailTab = action.payload
    },
    setSelectedTask(state, action) {
      state.selectedTask = action.payload
    },
    setSelectedLabor(state, action) {
      state.selectedLabor = action.payload
    },
    setSelectedMaterial(state, action) {
      state.selectedMaterial = action.payload
    },
    setSelectedTool(state, action) {
      state.selectedTool = action.payload
    },
    setSelectedFailure(state, action) {
      state.selectedFailure = action.payload
    },
    setSelectedFailureCauses(state, action) {
      state.selectedFailureCauses = action.payload
    },
    setDetailFailureVisible(state, action) {
      state.detailFailureVisible = action.payload
    },
    resetState() {
      return initialState
    },
  },
})

export const quickReportingActions = quickReportingSlice.actions

export default quickReportingSlice.reducer
