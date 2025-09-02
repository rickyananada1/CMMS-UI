import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { conditionMonitoringActions } from './slices/conditionMonitoringSlices'
import { TabsWrapper } from 'src/components/elements/tabs'
import ConditionMonitoringList from './page/list/ConditionMonitoringList'
import ConditionMonitoring from './page/cm/ConditionMonitoring'
import { breadcrumbActions } from 'src/store/actions'

const ConditionMonitoringTab = () => {
  const dispatch = useDispatch()
  const conditionMonitoringState = useSelector((state) => state.conditionMonitoring)

  const tabsContent = [
    {
      title: 'List',
      element: (
        <ConditionMonitoringList
          mode={conditionMonitoringState?.selectedAppAction}
          setAction={(param) => dispatch(conditionMonitoringActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(conditionMonitoringActions.setSelectedAppIndex(param))}
        />
      ),
    },
    {
      title: 'Condition Monitoring',
      disabled: !conditionMonitoringState?.selectedConditionMonitoring,
      element: (
        <ConditionMonitoring
          mode={conditionMonitoringState?.selectedAppAction}
          setAction={(param) => dispatch(conditionMonitoringActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(conditionMonitoringActions.setSelectedAppIndex(param))}
        />
      ),
    },
  ]

  const chooseActionMenu = [
    {
      group: 'Condition Monitoring',
      menu: [
        {
          title: 'New Condition Monitoring',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Condition Monitoring',
          app_action: 'Create',
          action: () => {
            dispatch(
              conditionMonitoringActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Condition Monitoring',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Condition Monitoring',
          app_action: 'Update',
          disabled: !conditionMonitoringState?.selectedConditionMonitoring,
          action: () => {
            dispatch(
              conditionMonitoringActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Condition Monitoring',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Condition Monitoring',
          app_action: 'Delete',
          disabled: !conditionMonitoringState?.selectedConditionMonitoring,
          action: () => {
            dispatch(
              conditionMonitoringActions.setSelectedAppIndexAndAction({
                index: 0,
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
        name:
          conditionMonitoringState.selectedAppIndex !== 1
            ? tabsContent[conditionMonitoringState.selectedAppIndex].title
            : 'Detail',
        index: 2,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditionMonitoringState.selectedAppIndex])

  // Cleanup function to dispatch reset action when component is unmounted
  useEffect(() => {
    return () => {
      dispatch(conditionMonitoringActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TabsWrapper
      defaultIndex={conditionMonitoringState.selectedAppIndex}
      selectedIndex={conditionMonitoringState.selectedAppIndex}
      content={tabsContent}
      chooseActionMenu={chooseActionMenu}
      actionMenuCallback={(action) => {
        action()
      }}
      onSelect={(tabIndex) => {
        dispatch(
          conditionMonitoringActions.setSelectedAppIndexAndAction({
            index: tabIndex,
            action: 'Read',
          }),
        )
      }}
    />
  )
}

export default ConditionMonitoringTab
