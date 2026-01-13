import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedECp: null,
  selectedGroup: null,
  currentData: null,
  hasData: false,
  visiblePopUp: false,
  data: [],
}

export const ecpSlice = createSlice({
  name: 'ecpDetail',
  initialState,
  reducers: {
    setEcpData(state, action) {
      state.data = action.payload
      state.hasData = action.payload?.length > 0
    },
    resetEcpData(state) {
      state.data = []
      state.currentData = null
      state.hasData = false
      state.selectedECp = null
    },
    setSelectedEcp(state, action) {
      state.selectedECp = action.payload
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

export const ecpDetailActions = ecpSlice.actions

export default ecpSlice.reducer
