import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Redirect = () => {
  const { page } = useParams()
  const permissionsState = useSelector((state) => state.auth.permissions)

  const getRedirectPath = (currentUrl) => {
    const currentIndex = permissionsState.findIndex(
      (item) => item.modul_name.toLowerCase() === currentUrl.toLowerCase(),
    )

    if (currentIndex !== -1 && !permissionsState[currentIndex].modul_menu_link) {
      // If current URL matches an item and it has no 'modul_menu_link' attribute
      const nextIndex = currentIndex + 1
      if (nextIndex < permissionsState.length && permissionsState[nextIndex].modul_menu_link) {
        return permissionsState[nextIndex].modul_menu_link
      }
    } else return '/page/dashboard'
  }
  return <Navigate to={getRedirectPath(page)} />
}

export default React.memo(Redirect)
