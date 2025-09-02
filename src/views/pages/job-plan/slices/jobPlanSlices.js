import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedJobPlan: null,
  visiblePopUp: false,
}

export const jobPlanSlice = createSlice({
  name: 'jobPlan',
  initialState,
  reducers: {
    setSelectedAppIndex(state, action) {
      state.selectedAppIndex = action.payload
    },
    setSelectedAppAction(state, action) {
      state.selectedAppAction = action.payload
    },
    setSelectedJobPlan(state, action) {
      state.selectedJobPlan = action.payload
    },
    setSelectedAppIndexAndAction(state, action) {
      state.selectedAppIndex = action.payload?.index
      state.selectedAppAction = action.payload?.action
    },
    setVisiblePopUp(state, action) {
      state.visiblePopUp = action.payload
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
    setUpdateLabor(state, action) {
      state.selectedLabor.labor = action.payload
    },
    setUpdateTool(state, action) {
      state.selectedTool.tool = action.payload
    },
    resetState() {
      return initialState
    },
  },
})

export const jobPlanActions = jobPlanSlice.actions

export default jobPlanSlice.reducer
