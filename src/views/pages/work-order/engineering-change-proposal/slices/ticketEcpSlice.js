import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedTicketEcp: null,
  visiblePopUp: false,
  selectedFailureAnalysisTab: 0,
  selectedFailureDefTab: 0,
}

export const ticketEcpSlice = createSlice({
  name: 'ticketEcp',
  initialState,
  reducers: {
    setSelectedAppIndex(state, action) {
      state.selectedAppIndex = action.payload
    },
    setSelectedAppAction(state, action) {
      state.selectedAppAction = action.payload
    },
    setSelectedTicketEcp(state, action) {
      state.selectedTicketEcp = action.payload
    },
    setSelectedAppIndexAndAction(state, action) {
      state.selectedAppIndex = action.payload?.index
      state.selectedAppAction = action.payload?.action
    },
    setVisiblePopUp(state, action) {
      state.visiblePopUp = action.payload
    },
    // selectedFailureAnalysisTab(state, action) {
    //   state.selectedPlanTab = action.payload
    // },
    // selectedFailureDefTab(state, action) {
    //   state.selectedActualTab = action.payload
    // },
    resetState() {
      return initialState
    },
  },
})

export const ticketEcpActions = ticketEcpSlice.actions

export default ticketEcpSlice.reducer
