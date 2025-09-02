import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedGroup: null,
  visiblePopUp: false,
  selectedSite: null,
  selectedAddress: null,
  selectedTabIndex: 0,
  selectedTabAction: null,
}

export const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
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
    setSelectedSite(state, action) {
      state.selectedSite = action.payload
    },
    setSelectedAddress(state, action) {
      state.selectedAddress = action.payload
    },
    setSelectedTabIndex(state, action) {
      state.selectedTabIndex = action.payload
    },
    setSelectedTabAction(state, action) {
      state.selectedTabAction = action.payload
    },
    setSelectedTabIndexAndAction(state, action) {
      state.selectedTabIndex = action.payload?.index
      state.selectedTabAction = action.payload?.action
    },
    resetAddress(state, _) {
      state.selectedAddress = null
    },
    resetSite(state, _) {
      state.selectedSite = null
    },
    resetState() {
      return initialState
    },
  },
})

export const organizationActions = organizationSlice.actions

export default organizationSlice.reducer
