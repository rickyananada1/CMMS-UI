import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TabsWrapper } from 'src/components/elements/tabs'
import { preventiveMaintenanceActions } from './slices/preventiveMaintenanceSlices'
import PreventiveMaintenanceList from './pages/list/PreventiveMaintenanceList'
import PreventiveMaintenanceIndex from './pages/maintenance/PreventiveMaintenanceIndex'
import FrequencySeasonalIndex from './pages/frequency-seasonal/FrequencySeasonalIndex'
import { breadcrumbActions } from 'src/store/actions'
import moment from 'moment'

const PreventiveMaintenanceTabs = () => {
  const dispatch = useDispatch()
  const preventiveMaintenanceState = useSelector((state) => state.preventiveMaintenances)

  const isManualWODisabled = () => {
    return !moment(moment().format('YYYY-M-D')).isBetween(
      `${moment().format('YYYY')}-${
        preventiveMaintenanceState?.selectedFrequencySeasonal?.start_month
      }-${preventiveMaintenanceState?.selectedFrequencySeasonal?.start_date}`,
      `${moment().format('YYYY')}-${
        preventiveMaintenanceState?.selectedFrequencySeasonal?.end_month
      }-${preventiveMaintenanceState?.selectedFrequencySeasonal?.end_month}`,
      undefined,
      '[]',
    )
  }

  const tabsContent = [
    {
      title: 'List',
      element: (
        <PreventiveMaintenanceList
          mode={preventiveMaintenanceState?.selectedAppAction}
          setAction={(param) => dispatch(preventiveMaintenanceActions.setSelectedAppAction(param))}
        />
      ),
    },
    {
      title: 'Preventive Maintenance',
      disabled: !preventiveMaintenanceState?.selectedPreventiveMaintenance,
      element: (
        <PreventiveMaintenanceIndex
          mode={preventiveMaintenanceState?.selectedAppAction}
          setAction={(param) => dispatch(preventiveMaintenanceActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(preventiveMaintenanceActions.setSelectedAppIndex(param))}
          setVisible={(param) => dispatch(preventiveMaintenanceActions.setVisiblePopUp(param))}
        />
      ),
    },
    {
      title: 'Frequency & Seasonal',
      disabled: !preventiveMaintenanceState?.selectedPreventiveMaintenance,
      element: (
        <FrequencySeasonalIndex
          mode={preventiveMaintenanceState?.selectedAppAction}
          setAction={(param) => dispatch(preventiveMaintenanceActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(preventiveMaintenanceActions.setSelectedAppIndex(param))}
        />
      ),
    },
  ]

  const chooseActionMenu = [
    {
      group: 'Preventive Maintenance',
      menu: [
        {
          title: 'New Preventive Maintenance',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Preventive Maintenance',
          app_action: 'Create',
          action: () => {
            dispatch(
              preventiveMaintenanceActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Preventive Maintenance',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Preventive Maintenance',
          app_action: 'Update',
          disabled: !preventiveMaintenanceState?.selectedPreventiveMaintenance,
          action: () => {
            dispatch(
              preventiveMaintenanceActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Preventive Maintenance',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Preventive Maintenance',
          app_action: 'Update',
          disabled: !preventiveMaintenanceState?.selectedPreventiveMaintenance,
          action: () => {
            dispatch(
              preventiveMaintenanceActions.setSelectedAppIndexAndAction({
                index: 0,
                action: 'Delete',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Frequency & Seasonal',
      menu: [
        {
          title: 'Update/Edit Frequency & Seasonal',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Preventive Maintenance',
          app_action: 'Update',
          disabled: !preventiveMaintenanceState?.selectedPreventiveMaintenance,
          action: () => {
            dispatch(
              preventiveMaintenanceActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Reset Frequency & Seasonal',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Preventive Maintenance',
          app_action: 'Update',
          disabled: !preventiveMaintenanceState?.selectedPreventiveMaintenance,
          action: () => {
            dispatch(
              preventiveMaintenanceActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Delete',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Work Order',
      menu: [
        {
          title: 'Manual Create Work Order',
          disabled:
            !preventiveMaintenanceState?.selectedFrequencySeasonal ||
            preventiveMaintenanceState?.selectedFrequencySeasonal?.auto_create_work_order ||
            isManualWODisabled(),
          action: () => {
            dispatch(
              preventiveMaintenanceActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Create PM WO',
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
          preventiveMaintenanceState.selectedAppIndex !== 1
            ? tabsContent[preventiveMaintenanceState.selectedAppIndex].title
            : 'Detail',
        index: 2,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preventiveMaintenanceState.selectedAppIndex])

  useEffect(() => {
    return () => {
      dispatch(preventiveMaintenanceActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TabsWrapper
      defaultIndex={preventiveMaintenanceState.selectedAppIndex}
      selectedIndex={preventiveMaintenanceState.selectedAppIndex}
      content={tabsContent}
      chooseActionMenu={chooseActionMenu}
      actionMenuCallback={(action) => {
        action()
      }}
      onSelect={(tabIndex) => {
        dispatch(
          preventiveMaintenanceActions.setSelectedAppIndexAndAction({
            index: tabIndex,
            action: 'Read',
          }),
        )
      }}
    />
  )
}

export default PreventiveMaintenanceTabs
