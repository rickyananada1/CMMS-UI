import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedFailureCode: null,
  selectedProblem: null,
  selectedCauses: null,
  selectedRemedies: null,
  visiblePopUp: false,
}

export const failureCodesSlice = createSlice({
  name: 'failureCodes',
  initialState,
  reducers: {
    setSelectedAppIndex(state, action) {
      state.selectedAppIndex = action.payload
    },
    setSelectedAppAction(state, action) {
      state.selectedAppAction = action.payload
    },
    setSelectedFailureCode(state, action) {
      state.selectedFailureCode = action.payload
    },
    setSelectedAppIndexAndAction(state, action) {
      state.selectedAppIndex = action.payload?.index
      state.selectedAppAction = action.payload?.action
    },
    setVisiblePopUp(state, action) {
      state.visiblePopUp = action.payload
    },
    setSelectedProblem(state, action) {
      state.selectedProblem = action.payload
    },
    setSelectedCauses(state, action) {
      state.selectedCauses = action.payload
    },
    setSelectedRemedies(state, action) {
      state.selectedRemedies = action.payload
    },
    setSelectedProblemAndCauses(state, action) {
      state.selectedProblem = action.payload?.problem
      state.selectedCauses = action.payload?.causes
    },
    setResetSelectedCauses(state) {
      state.selectedCauses = null
    },
    resetState() {
      return initialState
    },
  },
})

export const failureCodesActions = failureCodesSlice.actions

export default failureCodesSlice.reducer
