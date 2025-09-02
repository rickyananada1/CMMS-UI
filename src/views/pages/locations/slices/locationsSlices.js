import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedLocation: null,
  selectedLocationMeter: null,
  visiblePopUp: false,
  visiblePopUpLocationParent: false,
  visiblePopUpLocationChild: false,
  visiblePopUpLocationMeter: false,
  isRefetchDetailLocation: false,
  isRefetchChildLocation: false,
}

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setSelectedAppIndex(state, action) {
      state.selectedAppIndex = action.payload
    },
    setSelectedAppAction(state, action) {
      state.selectedAppAction = action.payload
    },
    setSelectedLocation(state, action) {
      state.selectedLocation = action.payload
    },
    setSelectedLocationMeter(state, action) {
      state.selectedLocationMeter = action.payload
    },
    setSelectedAppIndexAndAction(state, action) {
      state.selectedAppIndex = action.payload?.index
      state.selectedAppAction = action.payload?.action
    },
    setVisiblePopUp(state, action) {
      state.visiblePopUp = action.payload
    },
    setVisiblePopUpLocationParent(state, action) {
      state.visiblePopUpLocationParent = action.payload
    },
    setVisiblePopUpLocationChild(state, action) {
      state.visiblePopUpLocationChild = action.payload
    },
    setVisiblePopUpLocationMeter(state, action) {
      state.visiblePopUpLocationMeter = action.payload
    },
    setIsRefetchDetailLocation(state, action) {
      state.isRefetchDetailLocation = action.payload
    },
    setIsRefetchChildLocation(state, action) {
      state.isRefetchChildLocation = action.payload
    },
    setUpdateLocationMeter(state, action) {
      state.selectedLocationMeter.meter = action.payload
    },
    resetState() {
      return initialState
    },
  },
})

export const locationsActions = locationsSlice.actions

export default locationsSlice.reducer
