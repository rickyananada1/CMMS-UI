import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarFooter } from '@coreui/react'

import { AppHeaderDropdown } from './header'
import AppSidebarModuleMenu from './AppSidebarModuleMenu'
import LogoCmmsSidebar from 'src/assets/images/cmms-sidebar-new-logo.png'
import { appActions, breadcrumbActions } from 'src/store/actions'

const styles = {
  width: '80px',
}

const AppSidebarModule = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sidebarModule = useSelector((state) => state.app.sidebarModule)
  const permissionsState = useSelector((state) => state.auth.permissions)

  const handleClickLogo = () => {
    dispatch(appActions.setSidebarApplications(false))
    dispatch(breadcrumbActions.resetState())
    navigate('/')
  }

  return (
    <CSidebar style={styles} position="fixed" unfoldable={false} visible={sidebarModule}>
      <CSidebarBrand className="d-none d-md-flex">
        <img
          className="mt-2.5 cursor-pointer sidebar-brand"
          src={LogoCmmsSidebar}
          width={60}
          alt="logo_lite"
          onClick={handleClickLogo}
        />
      </CSidebarBrand>
      <CSidebarNav className="flex items-center mt-[35px]">
        <AppSidebarModuleMenu items={permissionsState} />
      </CSidebarNav>
      <CSidebarFooter className="flex items-center justify-center flex-column">
        <AppHeaderDropdown />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebarModule)
