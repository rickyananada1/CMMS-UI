import React, { useEffect } from 'react'
import { TabsWrapper } from '../../../../components/elements/tabs/TabsWrapper'
import OrganizationList from './OrganizationList'
import OrganizationInfo from './OrganizationInfo'
import OrganizationSites from './OrganizationSites'
import useOrganizationTab from '../hooks/useOrganizationTab'
import OrganizationAddressesInfo from './OrganizationAddressesInfo'
import { SelectedRowProvider } from '../hooks/useSelectedRow'
import { useDispatch, useSelector } from 'react-redux'
import { organizationActions } from '../slices/organizationSlices'
import { breadcrumbActions } from 'src/store/actions'

const OrganizationTab = () => {
  const dispatch = useDispatch()
  const organizationState = useSelector((state) => state.organization)

  const { selectedTab } = useOrganizationTab()

  const tabsContent = [
    {
      title: 'List',
      element: (
        <OrganizationList
          mode={organizationState?.selectedAppAction}
          setAction={(param) => dispatch(organizationActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(organizationActions.setSelectedAppIndex(param))}
        />
      ),
    },
    {
      title: `Organization`,
      disabled: !organizationState?.selectedGroup,
      element: (
        <OrganizationInfo
          mode={organizationState?.selectedAppAction}
          setAction={(param) => dispatch(organizationActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(organizationActions.setSelectedAppIndex(param))}
        />
      ),
    },
    {
      title: 'Addresses',
      disabled: !organizationState?.selectedGroup,
      element: (
        <OrganizationAddressesInfo
          mode={organizationState?.selectedAppAction}
          setAction={(param) => dispatch(organizationActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(organizationActions.setSelectedAppIndex(param))}
        />
      ),
    },
    {
      title: 'Sites',
      disabled: !organizationState?.selectedGroup,
      element: (
        <OrganizationSites
          mode={organizationState?.selectedAppAction}
          setAction={(param) => dispatch(organizationActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(organizationActions.setSelectedAppIndex(param))}
        />
      ),
    },
  ]

  const chooseActionMenu = [
    {
      group: 'Organization',
      menu: [
        {
          title: 'New Organization',
          modul_name: 'Administration',
          app_group: 'Administration',
          app_name: 'Organization',
          app_action: 'Create',
          action: () => {
            dispatch(
              organizationActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Organization',
          modul_name: 'Administration',
          app_group: 'Administration',
          app_name: 'Organization',
          app_action: 'Update',
          disabled: !organizationState?.selectedGroup,
          action: () => {
            dispatch(
              organizationActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Organization',
          modul_name: 'Administration',
          app_group: 'Administration',
          app_name: 'Organization',
          app_action: 'Delete',
          disabled: !organizationState?.selectedGroup,
          action: () => {
            dispatch(
              organizationActions.setSelectedAppIndexAndAction({
                index: 0,
                action: 'Delete',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Addresses',
      menu: [
        {
          title: 'New Addresses',
          modul_name: 'Administration',
          app_group: 'Administration',
          app_name: 'Organization',
          app_action: 'Update',
          disabled: !organizationState?.selectedGroup,
          action: () => {
            dispatch(
              organizationActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'CreateAddress',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Addresess',
          modul_name: 'Administration',
          app_group: 'Administration',
          app_name: 'Organization',
          app_action: 'Update',
          disabled: !organizationState?.selectedAddress,
          action: () => {
            dispatch(
              organizationActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'UpdateAddress',
              }),
            )
          },
        },
        {
          title: 'Delete Addresess',
          modul_name: 'Administration',
          app_group: 'Administration',
          app_name: 'Organization',
          app_action: 'Update',
          disabled: !organizationState?.selectedAddress,
          action: () => {
            dispatch(
              organizationActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'DeleteAddress',
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
          modul_name: 'Administration',
          app_group: 'Administration',
          app_name: 'Organization',
          app_action: 'Update',
          disabled: !organizationState?.selectedGroup,
          action: () => {
            dispatch(
              organizationActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Sites',
          modul_name: 'Administration',
          app_group: 'Administration',
          app_name: 'Organization',
          app_action: 'Update',
          disabled: !organizationState?.selectedSite,
          action: () => {
            dispatch(
              organizationActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Sites',
          modul_name: 'Administration',
          app_group: 'Administration',
          app_name: 'Organization',
          app_action: 'Update',
          disabled: !organizationState?.selectedSite,
          action: () => {
            dispatch(
              organizationActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Delete',
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
        name: selectedTab !== 1 ? tabsContent[organizationState.selectedAppIndex].title : 'Detail',
        index: 2,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationState.selectedAppIndex])

  // Cleanup function to dispatch reset action when component is unmounted
  useEffect(() => {
    return () => {
      dispatch(organizationActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SelectedRowProvider>
      <TabsWrapper
        defaultIndex={organizationState?.selectedAppIndex}
        selectedIndex={organizationState?.selectedAppIndex}
        content={tabsContent}
        chooseActionMenu={chooseActionMenu}
        actionMenuCallback={(action) => {
          action()
        }}
        onSelect={(tabIndex) => {
          dispatch(
            organizationActions.setSelectedAppIndexAndAction({
              index: tabIndex,
              action: 'Read',
            }),
          )
        }}
      />
    </SelectedRowProvider>
  )
}

export default OrganizationTab
