/* eslint-disable */
/* prettier-ignore-start */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedServiceRequest: null,
  visiblePopUp: false,
  selectedActualTab: 0,
  selectedDetailTab: 0,
}

export const serviceRequestSlice = createSlice({
  name: 'serviceRequest',
  initialState,
  reducers: {
    setSelectedAppIndex(state, action) {
      state.selectedAppIndex = action.payload
    },
    setSelectedAppAction(state, action) {
      state.selectedAppAction = action.payload
    },
    setVisiblePopUp(state, action) {
      state.visiblePopUp = action.payload
    },
    setSelectedServiceReq(state, action) {
      state.selectedServiceRequest = action.payload
    },
    setSelectedAppIndexAndAction(state, action) {
      state.selectedAppIndex = action.payload?.index
      state.selectedAppAction = action.payload?.action
    },
     setSelectedActualTab(state, action) {
      state.selectedActualTab = action.payload
    },
     setSelectedDetailTab(state, action) {
      state.selectedDetailTab = action.payload
    },
    resetState() {
      return initialState
    },
  },
})

export const serviceRequestActions = serviceRequestSlice.actions

export default serviceRequestSlice.reducer
