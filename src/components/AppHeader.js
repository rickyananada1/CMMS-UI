import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { appActions } from 'src/store/actions'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavItem,
  CHeaderToggler,
} from '@coreui/react'

import { AppBreadcrumb } from './index'
import LogoPln from 'src/assets/images/Logo_PLN.png'
import { TbMenu2 } from 'react-icons/tb'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarModule = useSelector((state) => state.app.sidebarModule)

  return (
    <CHeader position="sticky" className="mb-3.5" style={{ zIndex: 1010 }}>
      <CContainer fluid>
        <CHeaderToggler
          className="d-md-none d-sm-flex"
          onClick={() => dispatch(appActions.setSidebarModule(!sidebarModule))}
        >
          <TbMenu2 size={20} />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <img className="sidebar-brand" src={LogoPln} width={80} alt="logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto w-full">
          <CNavItem>
            <AppBreadcrumb />
          </CNavItem>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
