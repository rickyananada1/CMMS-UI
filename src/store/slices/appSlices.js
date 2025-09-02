import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarModule: true,
  sidebarApplications: false,
  selectedApplication: {
    modul_name: 'Dashboard',
    modul_icon: 'TbHome',
    modul_menu_link: '/page/dashboard',
    applications: null,
  },
  applications: [],
  selectedModul: 'Dashboard',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSidebarModule(state, action) {
      state.sidebarModule = action.payload
    },
    setSidebarApplications(state, action) {
      state.sidebarApplications = action.payload
    },
    setSelectedApplications(state, action) {
      state.selectedApplication = action.payload
    },
    setApplications(state, action) {
      state.applications = action.payload
    },
    setSelectedModul(state, action) {
      state.selectedModul = action.payload
    },
    resetState() {
      return initialState
    },
  },
})

export const appActions = appSlice.actions

export default appSlice.reducer
