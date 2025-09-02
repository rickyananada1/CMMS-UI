import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedAppIndex: 0,
  selectedAppAction: 'Read',
  selectedAsset: null,
  selectedAssetMeter: null,
  visiblePopUp: false,
  visiblePopUpDownload: false,
  visiblePopUpAssetMeter: false,
  isRefetchList: false,
}

export const assetSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setSelectedAppIndex(state, action) {
      state.selectedAppIndex = action.payload
    },
    setSelectedAppAction(state, action) {
      state.selectedAppAction = action.payload
    },
    setSelectedAsset(state, action) {
      state.selectedAsset = action.payload
    },
    setSelectedAssetMeter(state, action) {
      state.selectedAssetMeter = action.payload
    },
    setUpdateAssetMeter(state, action) {
      state.selectedAssetMeter.meter = action.payload
    },
    setSelectedRelation(state, action) {
      state.selectedRelation = action.payload
    },
    setSelectedAppIndexAndAction(state, action) {
      state.selectedAppIndex = action.payload?.index
      state.selectedAppAction = action.payload?.action
    },
    setVisiblePopUp(state, action) {
      state.visiblePopUp = action.payload
    },
    setVisiblePopUpDownload(state, action) {
      state.visiblePopUpDownload = action.payload
    },
    setVisiblePopUpAssetMeter(state, action) {
      state.visiblePopUpAssetMeter = action.payload
    },
    setIsRefetchList(state, action) {
      state.isRefetchList = action.payload
    },
    resetState() {
      return initialState
    },
  },
})

export const assetActions = assetSlice.actions

export default assetSlice.reducer
