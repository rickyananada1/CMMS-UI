import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedSafety: null,
  selectedSafetyMaterial: null,
  selectedSafetyTagOut: null,
  visiblePopUp: false,
  isRefetchList: false,
}

export const assetsSafetySlices = createSlice({
  name: 'assetsSafety',
  initialState,
  reducers: {
    setSelectedAppIndex(state, action) {
      state.selectedAppIndex = action.payload
    },
    setSelectedAppAction(state, action) {
      state.selectedAppAction = action.payload
    },
    setSelectedSafety(state, action) {
      state.selectedSafety = action.payload
    },
    setSelectedSafetyMaterial(state, action) {
      state.selectedSafetyMaterial = action.payload
    },
    setSelectedSafetyTagOut(state, action) {
      state.selectedSafetyTagOut = action.payload
    },
    setSelectedAppIndexAndAction(state, action) {
      state.selectedAppIndex = action.payload?.index
      state.selectedAppAction = action.payload?.action
    },
    setVisiblePopUp(state, action) {
      state.visiblePopUp = action.payload
    },
    setIsRefetchList(state, action) {
      state.isRefetchList = action.payload
    },
    resetState() {
      return initialState
    },
  },
})

export const assetsSafetyActions = assetsSafetySlices.actions

export default assetsSafetySlices.reducer
