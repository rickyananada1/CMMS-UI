import { createSlice, createAction } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedFailureAnalysis: null,
  selectedGroup: null,
  currentData: null,
  hasData: false,
  visiblePopUp: false,
  data: [],
}

export const failureAnalysSlice = createSlice({
  name: 'faTask',
  initialState,
  reducers: {
    setFailureAnalysisData(state, action) {
      state.data = action.payload
      state.hasData = action.payload?.length > 0
    },
    setHasData(state, action) {
      state.hasData = action.payload
    },
    setCurrentData(state, action) {
      state.currentData = action.payload
    },
    resetFailureAnalysisData(state) {
      state.data = []
      state.currentData = null
      state.hasData = false
      state.selectedFailureAnalysis = null
    },
    setSelectedFailureAnalysis(state, action) {
      state.selectedFailureAnalysis = action.payload
    },
    setCurrentFailureAnalysis: (state, action) => {
      state.currentFailureAnalysis = action.payload
    },
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

export const faTaskActions = failureAnalysSlice.actions

export default failureAnalysSlice.reducer
