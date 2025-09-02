import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { appActions, breadcrumbActions } from 'src/store/actions'

import { CSidebar, CSidebarNav } from '@coreui/react'
import AppSidebarApplicationsLink from './AppSidebarApplicationsLink'

const styles = {
  left: '80px',
  width: '255px',
  zIndex: 1020,
}

const DISABLED_APP_NAME = ['Assignment Manager', 'Labor', 'People', 'Person Groups']

const AppSidebarApplications = () => {
  const dispatch = useDispatch()
  const appState = useSelector((state) => state.app)

  return (
    <CSidebar
      style={styles}
      position="fixed"
      visible={appState.sidebarApplications}
      onVisibleChange={(visible) => {
        dispatch(appActions.setSidebarApplications(visible))
      }}
    >
      <CSidebarNav className="flex">
        {Array.isArray(appState.applications) &&
          appState.applications.length &&
          appState.applications
            .filter((app) => app.permission.some((perm) => perm.is_active))
            .map((app) => {
              return (
                <Fragment key={`group-app-${app?.application_group}`}>
                  <div className="flex items-center justify-between mt-2">
                    <p className="mt-2 font-normal text-body-small text-neutral-text-field text-nowrap">
                      {app?.application_group}
                    </p>
                    <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke" />
                  </div>
                  <div>
                    {Array.isArray(app?.permission) &&
                      app?.permission
                        .filter((permission) =>
                          app.permission.some(
                            (p) => p.app_name === permission.app_name && p.is_active,
                          ),
                        )
                        .filter(
                          (permission, index, self) =>
                            self.findIndex((p) => p.app_name === permission.app_name) === index,
                        )
                        .map((item) => {
                          return (
                            <AppSidebarApplicationsLink
                              key={`menu-app-${item?.app_name}`}
                              to={item?.app_menu_link}
                              name={item?.app_name}
                              isDisabled={DISABLED_APP_NAME.includes(item?.app_name)}
                              onClick={(e) => {
                                if (DISABLED_APP_NAME.includes(item?.app_name)) {
                                  e.preventDefault()
                                  return
                                }
                                dispatch(appActions.setSidebarApplications(false))
                                dispatch(
                                  breadcrumbActions.setBreadcrumb([
                                    {
                                      name: app?.application_group,
                                    },
                                    {
                                      name: item?.app_name,
                                      link: item?.app_menu_link,
                                    },
                                  ]),
                                )
                              }}
                            />
                          )
                        })}
                  </div>
                </Fragment>
              )
            })}
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebarApplications)
