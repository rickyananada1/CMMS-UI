import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedGroupApplication: null,
}

export const securityGroupApplicationsSlice = createSlice({
  name: 'securityGroupApplications',
  initialState,
  reducers: {
    setSelectedGroupApplication(state, action) {
      state.selectedGroupApplication = action.payload
    },
    resetState() {
      return initialState
    },
  },
})

export const securityGroupApplicationsActions = securityGroupApplicationsSlice.actions

export default securityGroupApplicationsSlice.reducer
