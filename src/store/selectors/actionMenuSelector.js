import { createSelector } from '@reduxjs/toolkit'
const permissionsState = (state) => state.auth.permissions

/**

 *

 * @param {String} modul_name
 * @param {String} app_name
 * @param {String} app_action
 * @returns Array

 */

export const actionMenuSelector = ({ modul_name, app_group, app_name, app_action }) => {
  return createSelector([permissionsState], (permissions) => {
    if (![modul_name, app_group, app_name, app_action].every((arg) => typeof arg === 'string')) {
      return false
    }

    const selectedModul = permissions.find(
      (permission) => permission?.modul_name?.trim() === modul_name?.trim(),
    )

    if (selectedModul) {
      const selectedApplication = selectedModul?.applications?.find(
        (application) => application?.application_group?.trim() === app_group?.trim(),
      )

      if (selectedApplication) {
        return selectedApplication?.permission?.some(
          (item) =>
            item?.app_name?.trim() === app_name?.trim() &&
            item?.app_action?.trim() === app_action?.trim() &&
            item?.is_active === true,
        )
      }

      return false
    }

    return false
  })
}
