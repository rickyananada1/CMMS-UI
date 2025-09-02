import React, { useEffect } from 'react'
import { TabsWrapper } from 'src/components/elements/tabs'
import UserList from './pages/list/UserList'
import UserIndex from './pages/user/UserIndex'
import { securityUserActions } from './slices/securityUserSlices'
import { useDispatch, useSelector } from 'react-redux'
import UserGroupsIndex from './pages/groups/UserGroupsIndex'
import SecurityProfileDetails from './pages/security-profile/SecurityProfileDetails'
import { breadcrumbActions } from 'src/store/actions'

const UserTab = () => {
  const dispatch = useDispatch()
  const securityUserState = useSelector((state) => state.securityUser)

  const tabsContent = [
    {
      title: 'List',
      element: <UserList />,
    },
    {
      title: 'User',
      disabled: !securityUserState?.selectedGroup,
      element: (
        <UserIndex
          mode={securityUserState?.selectedAppAction}
          setAction={(param) => dispatch(securityUserActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(securityUserActions.setSelectedAppIndex(param))}
        />
      ),
    },
    {
      title: 'Groups',
      disabled: !securityUserState?.selectedGroup || securityUserState?.selectedGroup?.type > 3,
      element: (
        <UserGroupsIndex
          mode={securityUserState?.selectedAppAction}
          setAction={(param) => dispatch(securityUserActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(securityUserActions.setSelectedAppIndex(param))}
        />
      ),
    },
    {
      title: 'Security Profile',
      disabled: !securityUserState?.selectedGroup || securityUserState?.selectedGroup?.type > 3,
      element: <SecurityProfileDetails />,
    },
  ]

  const chooseActionMenu = [
    {
      group: 'User',
      menu: [
        {
          title: 'New User',
          modul_name: 'Security',
          app_group: 'Security',
          app_name: 'Users',
          app_action: 'Create',
          action: () => {
            dispatch(
              securityUserActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit User',
          disabled: !securityUserState?.selectedGroup,
          modul_name: 'Security',
          app_group: 'Security',
          app_name: 'Users',
          app_action: 'Update',
          action: () => {
            dispatch(
              securityUserActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete User',
          disabled: !securityUserState?.selectedGroup,
          modul_name: 'Security',
          app_group: 'Security',
          app_name: 'Users',
          app_action: 'Delete',
          action: () => {
            dispatch(
              securityUserActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Delete',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Groups',
      menu: [
        {
          title: 'Update/Edit Groups',
          disabled: !securityUserState?.selectedGroup || securityUserState?.selectedGroup?.type > 3,
          modul_name: 'Security',
          app_group: 'Security',
          app_name: 'Users',
          app_action: 'Update',
          action: () => {
            dispatch(
              securityUserActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Update',
              }),
            )
          },
        },
      ],
    },
  ]

  useEffect(() => {
    dispatch(
      breadcrumbActions.setBreadcrumbItem({
        name:
          securityUserState.selectedAppIndex !== 1
            ? tabsContent[securityUserState.selectedAppIndex].title
            : 'Detail',
        index: 2,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [securityUserState.selectedAppIndex])

  // Cleanup function to dispatch reset action when component is unmounted
  useEffect(() => {
    return () => {
      dispatch(securityUserActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TabsWrapper
      defaultIndex={securityUserState.selectedAppIndex}
      selectedIndex={securityUserState.selectedAppIndex}
      content={tabsContent}
      chooseActionMenu={chooseActionMenu}
      actionMenuCallback={(action) => {
        action()
      }}
      onSelect={(tabIndex) => {
        dispatch(
          securityUserActions.setSelectedAppIndexAndAction({
            index: tabIndex,
            action: 'Read',
          }),
        )
      }}
    />
  )
}

export default UserTab
