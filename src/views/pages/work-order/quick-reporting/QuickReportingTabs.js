import React, { useEffect } from 'react'
import { TabsWrapper } from 'src/components/elements/tabs'
import QuickReportingList from './pages/list/QuickReportingList'
import { quickReportingActions } from './slices/quickReportingSlices'

import { useDispatch, useSelector } from 'react-redux'
import QuickReportingIndex from './pages/reporting/QuickReportingIndex'
import { breadcrumbActions } from 'src/store/actions'

const QuickReportingTab = () => {
  const dispatch = useDispatch()
  const quickReportingState = useSelector((state) => state.quickReporting)

  const tabsContent = [
    {
      title: 'List',
      element: <QuickReportingList />,
    },
    {
      title: 'Quick Reporting',
      disabled: !quickReportingState?.selectedWorkOrder,
      element: (
        <QuickReportingIndex
          mode={quickReportingState?.selectedAppAction}
          setAction={(param) => dispatch(quickReportingActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(quickReportingActions.setSelectedAppIndex(param))}
          setVisible={(param) => dispatch(quickReportingActions.setVisiblePopUp(param))}
        />
      ),
    },
  ]

  const chooseActionMenu = [
    {
      group: 'Work Order',
      menu: [
        {
          title: 'New Work Order',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Create',
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(0))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Work Order',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Update',
          disabled: !quickReportingState?.selectedWorkOrder,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(0))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Work Order',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Delete',
          disabled: !quickReportingState?.selectedWorkOrder,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(0))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Delete',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Failure Reporting',
      menu: [
        {
          title: 'New Failure Reporting',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Update',
          disabled: !quickReportingState?.selectedWorkOrder,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(0))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create Failure',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Failure Reporting',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Update',
          disabled:
            !quickReportingState?.selectedWorkOrder || !quickReportingState?.selectedFailure,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(0))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update Failure',
              }),
            )
          },
        },
        {
          title: 'Delete Failure Reporting',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Update',
          disabled: !quickReportingState?.selectedWorkOrder,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(0))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Delete Failure',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Task',
      menu: [
        {
          title: 'New Task',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Update',
          disabled: !quickReportingState?.selectedWorkOrder,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(1))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Task',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Update',
          disabled: !quickReportingState?.selectedWorkOrder || !quickReportingState?.selectedTask,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(1))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Task',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Update',
          disabled: !quickReportingState?.selectedWorkOrder || !quickReportingState?.selectedTask,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(1))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Delete',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Labor',
      menu: [
        {
          title: 'New Labor',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Update',
          disabled: !quickReportingState?.selectedWorkOrder,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(2))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create Labor',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Labor',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Update',
          disabled: !quickReportingState?.selectedWorkOrder || !quickReportingState?.selectedLabor,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(2))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update Labor',
              }),
            )
          },
        },
        {
          title: 'Delete Labor',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Update',
          disabled: !quickReportingState?.selectedWorkOrder || !quickReportingState?.selectedLabor,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(2))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Delete Labor',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Materials',
      menu: [
        {
          title: 'New Materials',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Update',
          disabled: !quickReportingState?.selectedWorkOrder,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(2))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create Materials',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Materials',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Update',
          disabled:
            !quickReportingState?.selectedWorkOrder || !quickReportingState?.selectedMaterial,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(2))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update Materials',
              }),
            )
          },
        },
        {
          title: 'Delete Materials',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Update',
          disabled:
            !quickReportingState?.selectedWorkOrder || !quickReportingState?.selectedMaterial,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(2))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Delete Materials',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Tools',
      menu: [
        {
          title: 'New Tools',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Update',
          disabled: !quickReportingState?.selectedWorkOrder,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(2))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create Tools',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Tools',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Update',
          disabled: !quickReportingState?.selectedWorkOrder || !quickReportingState?.selectedTool,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(2))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update Tools',
              }),
            )
          },
        },
        {
          title: 'Delete Tools',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Quick Reporting',
          app_action: 'Update',
          disabled: !quickReportingState?.selectedWorkOrder || !quickReportingState?.selectedTool,
          action: () => {
            dispatch(quickReportingActions.setSelectedDetailTab(2))
            dispatch(
              quickReportingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Delete Tools',
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
          quickReportingState.selectedAppIndex !== 1
            ? tabsContent[quickReportingState.selectedAppIndex].title
            : 'Detail',
        index: 2,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quickReportingState.selectedAppIndex])

  // Cleanup function to dispatch reset action when component is unmounted
  useEffect(() => {
    return () => {
      dispatch(quickReportingActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TabsWrapper
      defaultIndex={quickReportingState.selectedAppIndex}
      selectedIndex={quickReportingState.selectedAppIndex}
      content={tabsContent}
      chooseActionMenu={chooseActionMenu}
      actionMenuCallback={(action) => {
        action()
      }}
      onSelect={(tabIndex) => {
        dispatch(
          quickReportingActions.setSelectedAppIndexAndAction({
            index: tabIndex,
            action: 'Read',
          }),
        )
      }}
    />
  )
}

export default QuickReportingTab
