import React, { useEffect } from 'react'
import { MetersTabsWrapper } from 'src/components/elements/tabs'
import MetersLists from './meters/list/MetersLists'
import MetersDetailsIndex from './meters/detail/MetersDetailsIndex'
import MeterGroupsLists from './meter-groups/list/MeterGroupsLists'
import MeterGroupsDetailsIndex from './meter-groups/detail/MeterGroupsDetailsIndex'
import MetersAssetsIndex from './meters/assets/MetersAssetsIndex'
import MetersLocationsIndex from './meters/locations/MetersLocationsIndex'
import { useDispatch, useSelector } from 'react-redux'
import { metersActions } from './meters/slices/metersSlices'
import MetersConditionIndex from './meters/condition-monitoring/MetersConditionIndex'
import { breadcrumbActions } from 'src/store/actions'

const MetersTab = () => {
  const dispatch = useDispatch()
  const metersState = useSelector((state) => state.meters)

  const metersDropdown = [
    { name: 'List Meters', children: [{ name: 'List Meters', tab: 0 }] },
    {
      name: 'Meters',
      children: [{ name: 'Meters', tab: 1, disabled: !metersState.selectedMeter }],
    },
    {
      name: 'Where Used',
      children: [
        { name: 'Assets', tab: 4, disabled: !metersState.selectedMeter },
        { name: 'Location', tab: 5, disabled: !metersState.selectedMeter },
        { name: 'Condition Monitoring', tab: 6, disabled: !metersState.selectedMeter },
      ],
    },
  ]

  const groupsDropdown = [
    { name: 'List Meter Groups', children: [{ name: 'List Meter Groups', tab: 2 }] },
    {
      name: 'Meter Groups',
      children: [{ name: 'Meter Groups', tab: 3, disabled: !metersState.selectedMeterGroup }],
    },
  ]

  const tabsContent = [
    {
      title: 'Meters',
      element: (
        <MetersLists
          visible={metersState.visiblePopUp}
          setVisible={(param) => dispatch(metersActions.setVisiblePopUp(param))}
          mode={metersState?.selectedAppAction}
          setAction={(param) => dispatch(metersActions.setSelectedAppAction(param))}
        />
      ),
      dropdownList: metersDropdown,
    },
    {
      title: 'Meters Details',
      element: (
        <MetersDetailsIndex
          mode={metersState?.selectedAppAction}
          setAction={(param) => dispatch(metersActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(metersActions.setSelectedAppIndex(param))}
        />
      ),
      isChild: true,
    },
    {
      title: 'Meter Groups',
      element: (
        <MeterGroupsLists
          visible={metersState.visiblePopUp}
          deleteType={metersState.deleteType}
          setVisible={(param) => dispatch(metersActions.setDeleteTypeAndVisiblePopUp(param))}
          mode={metersState?.selectedAppAction}
          setAction={(param) => dispatch(metersActions.setSelectedAppAction(param))}
        />
      ),
      dropdownList: groupsDropdown,
    },
    {
      title: 'Meter Groups Details',
      element: (
        <MeterGroupsDetailsIndex
          mode={metersState?.selectedAppAction}
          setAction={(param) => dispatch(metersActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(metersActions.setSelectedAppIndex(param))}
        />
      ),
      isChild: true,
    },
    {
      title: 'Meters Assets',
      element: (
        <MetersAssetsIndex
          mode={metersState?.selectedAppAction}
          setAction={(param) => dispatch(metersActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(metersActions.setSelectedAppIndex(param))}
        />
      ),
      isChild: true,
    },
    {
      title: 'Meters Location',
      element: (
        <MetersLocationsIndex
          mode={metersState?.selectedAppAction}
          setAction={(param) => dispatch(metersActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(metersActions.setSelectedAppIndex(param))}
        />
      ),
      isChild: true,
    },
    {
      title: 'Meters Condition Monitoring',
      element: (
        <MetersConditionIndex
          mode={metersState?.selectedAppAction}
          setAction={(param) => dispatch(metersActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(metersActions.setSelectedAppIndex(param))}
        />
      ),
      isChild: true,
    },
  ]

  const meterActions = [
    {
      group: 'Meter',
      menu: [
        {
          title: 'New Meter',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Meters & Groups',
          app_action: 'Create',
          action: () => {
            dispatch(
              metersActions.setSelectedAppIndexMenuAndAction({
                index: 1,
                menu: 'Meter',
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Meter',
          to: 'create',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Meters & Groups',
          app_action: 'Update',
          disabled: !metersState.selectedMeter,
          action: () => {
            dispatch(
              metersActions.setSelectedAppIndexMenuAndAction({
                index: 1,
                menu: 'Meter',
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Meter',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Meters & Groups',
          app_action: 'Delete',
          action: () => {
            dispatch(
              metersActions.setSelectedAppIndexMenuAndAction({
                index: 0,
                menu: 'Meter',
                action: 'Delete',
              }),
            )
          },
        },
      ],
    },
  ]

  const meterGroupActions = [
    {
      group: 'Meter Group',
      menu: [
        {
          title: 'New Meter Group',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Meters & Groups',
          app_action: 'Create',
          action: () => {
            dispatch(
              metersActions.setSelectedAppIndexMenuAndAction({
                index: 3,
                menu: 'MeterGroup',
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Meter Group',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Meters & Groups',
          app_action: 'Update',
          disabled: !metersState.selectedMeterGroup,
          action: () => {
            dispatch(
              metersActions.setSelectedAppIndexMenuAndAction({
                index: 3,
                menu: 'MeterGroup',
                action: 'Update-MeterGroup',
              }),
            )
          },
        },
        {
          title: 'Delete Meter Group',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Meters & Groups',
          app_action: 'Delete',
          action: () => {
            dispatch(
              metersActions.setSelectedAppIndexMenuAndAction({
                index: 2,
                menu: 'MeterGroup',
                action: 'Delete',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Meter in Group',
      menu: [
        // {
        //   title: 'New Meter in Group',
        //   action: () => {
        //     dispatch(
        //       metersActions.setSelectedAppIndexMenuAndAction({
        //         index: 3,
        //         menu: 'MeterGroup',
        //         action: 'Create',
        //       }),
        //     )
        //   },
        // },
        {
          title: 'Update/Edit Meter in Group',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Meters & Groups',
          app_action: 'Update',
          disabled: !metersState.selectedMeterGroup,
          action: () => {
            dispatch(
              metersActions.setSelectedAppIndexMenuAndAction({
                index: 3,
                menu: 'MeterGroup',
                action: 'Update-MeterInGroup',
              }),
            )
          },
        },
        {
          title: 'Delete Meter in Group',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Meters & Groups',
          app_action: 'Delete',
          action: () => {
            dispatch(
              metersActions.setSelectedAppIndexMenuAndAction({
                index: 2,
                menu: 'MeterGroup',
                action: 'Read',
              }),
            )
            dispatch(
              metersActions.setDeleteTypeAndVisiblePopUp({
                deleteType: 'MeterInGroup',
                visiblePopUp: true,
              }),
            )
          },
        },
      ],
    },
  ]

  const chooseActionMenu = metersState.selectedMenu === 'Meter' ? meterActions : meterGroupActions

  useEffect(() => {
    dispatch(
      breadcrumbActions.setBreadcrumbItem({
        name: tabsContent[metersState.selectedAppIndex].title,
        index: 2,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metersState.selectedAppIndex])

  // Cleanup function to dispatch reset action when component is unmounted
  useEffect(() => {
    return () => {
      dispatch(metersActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MetersTabsWrapper
      defaultIndex={metersState.selectedAppIndex}
      selectedIndex={metersState.selectedAppIndex}
      selectedParent={metersState.selectedMenu}
      setSelectedParent={(menu) => {
        dispatch(metersActions.setSelectedMenu(menu))
      }}
      setTabIndex={(tabIndex) => {
        dispatch(
          metersActions.setSelectedAppIndexAndAction({
            index: tabIndex,
            action: 'Read',
          }),
        )
      }}
      content={tabsContent}
      chooseActionMenu={chooseActionMenu}
      actionMenuCallback={(action) => {
        action()
      }}
    />
  )
}

export default MetersTab
