/* eslint-disable */
/* prettier-ignore-start */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedServiceRequest: null,
  visiblePopUp: false,
  selectedWoTab: 0,
  serviceRequestDetailData: [],
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
    setSelectedWoTab(state, action) {
      state.selectedWoTab = action.payload
    },
    setServiceRequestDetailData(state, action) {
      state.serviceRequestDetailData = action.payload
    },
    setSelectedServiceRequest(state, action) {
      state.selectedServiceRequest = action.payload
    },
    resetTabs(state) {
      state.selectedWoTab = 0
    },
    resetState() {
      return initialState
    },
  },
})

export const serviceRequestActions = serviceRequestSlice.actions

export default serviceRequestSlice.reducer
