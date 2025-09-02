import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

import AppSidebarModule from './AppSidebarModule'
import AppSidebarApplications from './AppSidebarApplications'

const AppSidebar = () => {
  const appState = useSelector((state) => state.app)

  return (
    <Fragment>
      <AppSidebarModule />
      {appState?.sidebarApplications && appState.applications?.length && <AppSidebarApplications />}
    </Fragment>
  )
}

export default React.memo(AppSidebar)
