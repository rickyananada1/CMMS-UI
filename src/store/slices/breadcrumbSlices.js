import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  breadcrumb: [],
}

export const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    setBreadcrumb(state, action) {
      state.breadcrumb = action.payload
    },
    setBreadcrumbItem(state, action) {
      if (state.breadcrumb.length > 2) {
        state.breadcrumb = state.breadcrumb.map((item, index) =>
          index === 2 ? { ...item, name: action.payload?.name } : item,
        )
      } else {
        state.breadcrumb.push({ name: action.payload?.name })
      }
    },
    resetState() {
      return initialState
    },
  },
})

export const breadcrumbActions = breadcrumbSlice.actions

export default breadcrumbSlice.reducer
