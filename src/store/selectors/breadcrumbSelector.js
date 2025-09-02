import { createSelector } from '@reduxjs/toolkit'
const breadcrumbState = (state) => state.breadcrumb.breadcrumb

export const lastItemBreadcrumbSelector = () => {
  return createSelector([breadcrumbState], (breadcrumb) => breadcrumb[breadcrumb.length - 1])
}
