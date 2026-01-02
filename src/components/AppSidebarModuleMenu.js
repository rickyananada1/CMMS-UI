import React from 'react'
import PropTypes from 'prop-types'
import AppSidebarModuleLink from './AppSidebarModuleLink'
import { useDispatch } from 'react-redux'
import { appActions, breadcrumbActions } from 'src/store/actions'
import { CNavItem, CTooltip } from '@coreui/react'
import { useLocation } from 'react-router-dom'

const AppSidebarModule = ({ items }) => {
  const location = useLocation()
  const dispatch = useDispatch()

  const hasAnyActivePermission = (modules) => {
    if (!Array.isArray(modules)) return []

    return modules.filter((mod) => {
      const apps = mod?.applications
      // Keep modules with no applications (Dashboard)
      if (!Array.isArray(apps) || apps?.length === 0) return true

      return apps?.some(
        (app) =>
          Array.isArray(app?.permission) && app?.permission?.some((p) => p?.is_active === true),
      )
    })
  }

  const renderNavItem = (item, index) => {
    const { modul_name, modul_icon, modul_menu_link, applications, ...rest } = item

    const handleClickModule = () => {
      dispatch(appActions.setApplications(applications))
      dispatch(appActions.setSelectedApplications(item))
      dispatch(appActions.setSidebarApplications(true))

      if (!applications || (Array.isArray(applications) && !applications.length)) {
        dispatch(breadcrumbActions.resetState())
      }
    }

    let applicationLinks = []
    if (applications) {
      applicationLinks = applications.flatMap((app) =>
        app.permission ? app.permission.map((perm) => perm.app_menu_link) : [],
      )
    }

    const isActive =
      (modul_menu_link && location.pathname.includes(modul_menu_link)) ||
      applicationLinks.some((link) => location.pathname.includes(link))

    return (
      <CTooltip content={modul_name} placement="right">
        <span key={`module-menu-${index}`} onClick={handleClickModule} role="menuitem">
          <CNavItem
            className={`cursor-pointer flex justify-center align-middle items-center w-[45px] h-[45px] rounded ${
              isActive
                ? 'bg-primary text-white'
                : 'hover:text-primary-main hover:bg-primary-main hover:bg-opacity-10'
            }`}
            href={modul_menu_link && '#' + modul_menu_link}
            {...rest}
          >
            <AppSidebarModuleLink modul_icon={modul_icon} modul_name={modul_name} />
          </CNavItem>
        </span>
      </CTooltip>
    )
  }

  return (
    <React.Fragment>
      <div className="flex flex-col gap-2">
        {items && hasAnyActivePermission(items).map((item, index) => renderNavItem(item, index))}
      </div>
    </React.Fragment>
  )
}

AppSidebarModule.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      modul_name: PropTypes.string.isRequired,
      modul_icon: PropTypes.string.isRequired,
      modul_menu_link: PropTypes.string,
      applications: PropTypes.array,
    }),
  ).isRequired,
}

export default AppSidebarModule
