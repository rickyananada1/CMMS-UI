import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppHeader } from '../components/index'
import useLogin from 'src/views/pages/login/hooks/useLogin'
import { useGetProfile_ } from 'src/views/pages/login/services'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { appActions, authActions } from 'src/store/actions'

const DefaultLayout = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { handleLogout } = useLogin()
  const userToken = localStorage.getItem('access_token')
  const permissionsState = useSelector((state) => state.auth.permissions)
  const breadcrumbState = useSelector((state) => state.breadcrumb)

  const getProfile = useGetProfile_
  const getUserMe = getProfile({
    config: {
      enabled: false,
    },
  })

  const handleCloseSidbar = () => {
    const modulName =
      breadcrumbState.breadcrumb.length > 0 ? breadcrumbState.breadcrumb[0]?.name : 'Dashboard'
    const activeApp = permissionsState.find((item) => item.modul_name === modulName)

    dispatch(appActions.setApplications(activeApp.applications))
    dispatch(appActions.setSelectedApplications(activeApp))
    dispatch(appActions.setSidebarApplications(false))
  }

  useEffect(() => {
    if (userToken) getUserMe.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (!getUserMe.data) return

    const userMe = getUserMe?.data.data.data
    dispatch(authActions.setUser(userMe))
    if (!userMe) {
      handleLogout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserMe.data])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light" onClick={handleCloseSidbar}>
        <AppHeader />
        <div className="px-3 body flex-grow-1">
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  )
}

export default DefaultLayout
