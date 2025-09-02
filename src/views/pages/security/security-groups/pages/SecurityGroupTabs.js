import React, { useEffect } from 'react'
import { TabsWrapper } from 'src/components/elements/tabs'
import SecurityGroupSites from './sites/SecurityGroupSites'
import SecurityGroupLists from './list/SecurityGroupLists'
import SecurityGroupGroup from './group/SecurityGroupGroup'
import SecurityGroupApplications from './applications/SecurityGroupApplications'
import { useSelector, useDispatch } from 'react-redux'
import { securityGroupActions } from '../slices/securityGroupSlices'
import SecurityGroupUsers from './users/SecurityGroupUsers'
import { breadcrumbActions } from 'src/store/actions'

const SecurityGroupTab = () => {
  const dispatch = useDispatch()
  const securityGroupState = useSelector((state) => state.securityGroup)

  const tabsContent = [
    {
      title: 'List',
      element: <SecurityGroupLists />,
    },
    {
      title: 'Group',
      disabled: !securityGroupState?.selectedGroup,
      element: (
        <SecurityGroupGroup
          mode={securityGroupState?.selectedAppAction}
          setAction={(param) => dispatch(securityGroupActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(securityGroupActions.setSelectedAppIndex(param))}
        />
      ),
    },
    {
      title: 'Sites',
      disabled: !securityGroupState?.selectedGroup,
      element: (
        <SecurityGroupSites
          mode={securityGroupState?.selectedAppAction}
          setAction={(param) => dispatch(securityGroupActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(securityGroupActions.setSelectedAppIndex(param))}
          visible={securityGroupState?.visiblePopUp}
          setVisible={(param) => dispatch(securityGroupActions.setVisiblePopUp(param))}
        />
      ),
    },
    {
      title: 'Applications',
      disabled: !securityGroupState?.selectedGroup,
      element: (
        <SecurityGroupApplications
          mode={securityGroupState?.selectedAppAction}
          setAction={(param) => dispatch(securityGroupActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(securityGroupActions.setSelectedAppIndex(param))}
          visible={securityGroupState?.visiblePopUp}
          setVisible={(param) => dispatch(securityGroupActions.setVisiblePopUp(param))}
        />
      ),
    },
    {
      title: 'Users',
      disabled: !securityGroupState?.selectedGroup,
      element: <SecurityGroupUsers />,
    },
  ]

  const chooseActionMenu = [
    {
      group: 'Group',
      menu: [
        {
          title: 'New Group',
          modul_name: 'Security',
          app_group: 'Security',
          app_name: 'Security Groups',
          app_action: 'Create',
          action: () => {
            dispatch(
              securityGroupActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Group',
          disabled: !securityGroupState?.selectedGroup,
          modul_name: 'Security',
          app_group: 'Security',
          app_name: 'Security Groups',
          app_action: 'Update',
          action: () => {
            dispatch(
              securityGroupActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Group',
          disabled: !securityGroupState?.selectedGroup,
          modul_name: 'Security',
          app_group: 'Security',
          app_name: 'Security Groups',
          app_action: 'Delete',
          action: () => {
            dispatch(
              securityGroupActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Delete',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Sites',
      menu: [
        {
          title: 'New Sites',
          disabled: !securityGroupState?.selectedGroup,
          modul_name: 'Security',
          app_group: 'Security',
          app_name: 'Security Groups',
          app_action: 'Update',
          action: () => {
            dispatch(
              securityGroupActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Sites',
          disabled: !securityGroupState?.selectedGroup,
          modul_name: 'Security',
          app_group: 'Security',
          app_name: 'Security Groups',
          app_action: 'Update',
          action: () => {
            dispatch(
              securityGroupActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Sites',
          disabled: !securityGroupState?.selectedGroup,
          modul_name: 'Security',
          app_group: 'Security',
          app_name: 'Security Groups',
          app_action: 'Update',
          action: () => {
            dispatch(
              securityGroupActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Read',
              }),
            )
            dispatch(securityGroupActions.setVisiblePopUp(true))
          },
        },
      ],
    },
    {
      group: 'Application',
      menu: [
        {
          title: 'Update/Edit Application',
          disabled: !securityGroupState?.selectedGroup,
          modul_name: 'Security',
          app_group: 'Security',
          app_name: 'Security Groups',
          app_action: 'Update',
          action: () => {
            dispatch(
              securityGroupActions.setSelectedAppIndexAndAction({
                index: 3,
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
          securityGroupState.selectedAppIndex !== 1
            ? tabsContent[securityGroupState.selectedAppIndex].title
            : 'Detail',
        index: 2,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [securityGroupState.selectedAppIndex])

  // Cleanup function to dispatch reset action when component is unmounted
  useEffect(() => {
    return () => {
      dispatch(securityGroupActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TabsWrapper
      defaultIndex={securityGroupState.selectedAppIndex}
      selectedIndex={securityGroupState.selectedAppIndex}
      content={tabsContent}
      chooseActionMenu={chooseActionMenu}
      actionMenuCallback={(action) => {
        action()
      }}
      onSelect={(tabIndex) => {
        dispatch(
          securityGroupActions.setSelectedAppIndexAndAction({
            index: tabIndex,
            action: 'Read',
          }),
        )
      }}
    />
  )
}

export default SecurityGroupTab
