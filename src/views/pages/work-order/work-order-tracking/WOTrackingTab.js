import React, { useEffect } from 'react'
import { TabsWrapper } from 'src/components/elements/tabs'
import WOTrackingList from './pages/list/WOTrackingList'
import { woTrackingActions } from './slices/woTrackingSlices'

import { woLaborActions } from './pages/plans/pages/labor-materials-tools/slices/woLaborSlices'
import { woMaterialsActions } from './pages/plans/pages/labor-materials-tools/slices/woMaterialsSlices'
import { woToolsActions } from './pages/plans/pages/labor-materials-tools/slices/woToolsSlices'

import { useDispatch, useSelector } from 'react-redux'
import WOTrackingIndex from './pages/work-order/WOTrackingIndex'
import WOPlansTab from './pages/plans/WOPlansTab'
import WOActualsTab from './pages/actuals/WOActualsTab'
import { breadcrumbActions } from 'src/store/actions'

const WOTrackingTab = () => {
  const dispatch = useDispatch()
  const woTrackingState = useSelector((state) => state.woTracking)
  const woChildrenState = useSelector((state) => state.woChildern)
  const woLaborState = useSelector((state) => state.woLabor)
  const woMaterialsState = useSelector((state) => state.woMaterials)
  const woToolsState = useSelector((state) => state.woTools)
  const woTaskState = useSelector((state) => state.woTask)

  const isDeleteParentDisabled = () => {
    if (woTrackingState?.selectedWorkOrder?.parent_wo_id === null) {
      return true
    }
    if (
      woTrackingState?.selectedWorkOrder?.status === 'INPRG' ||
      woTrackingState?.selectedWorkOrder?.status === 'CLOSE'
    ) {
      return true
    }
    return false
  }

  const tabsContent = [
    {
      title: 'List',
      element: <WOTrackingList />,
    },
    {
      title: 'Work Order',
      disabled: !woTrackingState?.selectedWorkOrder,
      element: (
        <WOTrackingIndex
          mode={woTrackingState?.selectedAppAction}
          setAction={(param) => dispatch(woTrackingActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(woTrackingActions.setSelectedAppIndex(param))}
          setVisible={(param) => dispatch(woTrackingActions.setVisiblePopUp(param))}
        />
      ),
    },
    {
      title: 'Plans',
      disabled: !woTrackingState?.selectedWorkOrder,
      element: (
        <WOPlansTab
          mode={woTrackingState?.selectedAppAction}
          setAction={(param) => dispatch(woTrackingActions.setSelectedAppAction(param))}
        />
      ),
    },
    {
      title: 'Actuals',
      disabled: !woTrackingState?.selectedWorkOrder,
      element: (
        <WOActualsTab
          mode={woTrackingState?.selectedAppAction}
          setAction={(param) => dispatch(woTrackingActions.setSelectedAppAction(param))}
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
          app_name: 'Work Order Tracking',
          app_action: 'Create',
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
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
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled: !woTrackingState?.selectedWorkOrder,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
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
          app_name: 'Work Order Tracking',
          app_action: 'Delete',
          disabled: !woTrackingState?.selectedWorkOrder,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Delete',
              }),
            )
          },
        },
        {
          title: 'Delete Parent from Work Order',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled: !woTrackingState?.selectedWorkOrder || isDeleteParentDisabled(),
          action: () => {
            dispatch(woTrackingActions.setVisiblePopUp(true))
          },
        },
      ],
    },
    {
      group: 'Plans - Children of Work Order',
      menu: [
        {
          title: 'Create New Children',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled: !woTrackingState?.selectedWorkOrder,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Create',
              }),
            )
            dispatch(woTrackingActions.setSelectedPlanTab(0))
          },
        },
        {
          title: 'Update/Edit Children',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled:
            !woTrackingState?.selectedWorkOrder ||
            !woChildrenState?.selectedGroup ||
            woChildrenState?.selectedGroup.status === 'INPRG',
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Update',
              }),
            )
            dispatch(woTrackingActions.setSelectedPlanTab(0))
          },
        },
        {
          title: 'Delete Children',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled:
            !woTrackingState?.selectedWorkOrder ||
            !woChildrenState?.selectedGroup ||
            woChildrenState?.selectedGroup.status === 'INPRG',
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Delete',
              }),
            )
            dispatch(woTrackingActions.setSelectedPlanTab(0))
          },
        },
      ],
    },
    {
      group: 'Plans - Task of Work Order',
      menu: [
        {
          title: 'Create New Task',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled: !woTrackingState?.selectedWorkOrder,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Create',
              }),
            )
            dispatch(woTrackingActions.setSelectedPlanTab(1))
          },
        },
        {
          title: 'Update/Edit Task',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled:
            !woTrackingState?.selectedWorkOrder ||
            !woTaskState?.selectedGroup ||
            woTaskState?.selectedGroup.status === 'INPRG',
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Update',
              }),
            )
            dispatch(woTrackingActions.setSelectedPlanTab(1))
          },
        },
        {
          title: 'Delete Task',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled:
            !woTrackingState?.selectedWorkOrder ||
            !woTaskState?.selectedGroup ||
            woTaskState?.selectedGroup.status === 'INPRG',
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Delete',
              }),
            )
            dispatch(woTrackingActions.setSelectedPlanTab(1))
          },
        },
      ],
    },
    {
      group: 'Plans - Labor, Material, and Tools',
      menu: [
        {
          title: 'Create New Labor',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled: !woTrackingState?.selectedWorkOrder,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Create Labor',
              }),
            )
            dispatch(woTrackingActions.setSelectedPlanTab(2))
          },
        },
        {
          title: 'Create New Materials',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled: !woTrackingState?.selectedWorkOrder,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Create Materials',
              }),
            )
            dispatch(woTrackingActions.setSelectedPlanTab(2))
          },
        },
        {
          title: 'Create New Tools',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled: !woTrackingState?.selectedWorkOrder,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Create Tools',
              }),
            )
            dispatch(woTrackingActions.setSelectedPlanTab(2))
          },
        },
        {
          title: 'Update/Edit Labor',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled:
            !woTrackingState?.selectedWorkOrder ||
            !woLaborState?.selectedGroup ||
            woTrackingState.selectedAppIndex !== 2,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Update Labor',
              }),
            )
            dispatch(woTrackingActions.setSelectedPlanTab(2))
          },
        },
        {
          title: 'Update/Edit Materials',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled:
            !woTrackingState?.selectedWorkOrder ||
            !woMaterialsState?.selectedGroup ||
            woTrackingState.selectedAppIndex !== 2,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Update Materials',
              }),
            )
            dispatch(woTrackingActions.setSelectedPlanTab(2))
          },
        },
        {
          title: 'Update/Edit Tools',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled:
            !woTrackingState?.selectedWorkOrder ||
            !woToolsState?.selectedGroup ||
            woTrackingState.selectedAppIndex !== 2,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Update Tools',
              }),
            )
            dispatch(woTrackingActions.setSelectedPlanTab(2))
          },
        },
        {
          title: 'Delete Labor',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled:
            !woTrackingState?.selectedWorkOrder ||
            !woLaborState?.selectedGroup ||
            woTrackingState.selectedAppIndex !== 2,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Delete Labor',
              }),
            )
            dispatch(woTrackingActions.setSelectedPlanTab(2))
          },
        },
        {
          title: 'Delete Materials',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled:
            !woTrackingState?.selectedWorkOrder ||
            !woMaterialsState?.selectedGroup ||
            woTrackingState.selectedAppIndex !== 2,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Delete Materials',
              }),
            )
            dispatch(woTrackingActions.setSelectedPlanTab(2))
          },
        },
        {
          title: 'Delete Tools',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled:
            !woTrackingState?.selectedWorkOrder ||
            !woToolsState?.selectedGroup ||
            woTrackingState.selectedAppIndex !== 2,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Delete Tools',
              }),
            )
            dispatch(woTrackingActions.setSelectedPlanTab(2))
          },
        },
      ],
    },
    {
      group: 'Actuals - Children of Work Order',
      menu: [
        {
          title: 'Update/Edit Children',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled: !woTrackingState?.selectedWorkOrder,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Update',
              }),
            )
            dispatch(woTrackingActions.setSelectedActualTab(0))
          },
        },
      ],
    },
    {
      group: 'Actuals - Task for Work Order',
      menu: [
        {
          title: 'Update/Edit Task',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled: !woTrackingState?.selectedWorkOrder,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Update',
              }),
            )
            dispatch(woTrackingActions.setSelectedActualTab(1))
          },
        },
      ],
    },
    {
      group: 'Actuals - Labor, Material, and Tools',
      menu: [
        {
          title: 'Update/Edit Labor',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled:
            !woTrackingState?.selectedWorkOrder ||
            !woLaborState?.selectedGroup?.work_order_labor_actual_id ||
            woTrackingState.selectedAppIndex !== 3,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Update Labor',
              }),
            )
            dispatch(woTrackingActions.setSelectedActualTab(2))
          },
        },
        {
          title: 'Update/Edit Materials',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled:
            !woTrackingState?.selectedWorkOrder ||
            !woMaterialsState?.selectedGroup?.work_order_material_actual_id ||
            woTrackingState.selectedAppIndex !== 3,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Update Materials',
              }),
            )
            dispatch(woTrackingActions.setSelectedActualTab(2))
          },
        },
        {
          title: 'Update/Edit Tools',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Work Order Tracking',
          app_action: 'Update',
          disabled:
            !woTrackingState?.selectedWorkOrder ||
            !woToolsState?.selectedGroup?.work_order_tool_actual_id ||
            woTrackingState.selectedAppIndex !== 3,
          action: () => {
            dispatch(
              woTrackingActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Update Tools',
              }),
            )
            dispatch(woTrackingActions.setSelectedActualTab(2))
          },
        },
      ],
    },
  ]

  useEffect(() => {
    dispatch(
      breadcrumbActions.setBreadcrumbItem({
        name:
          woTrackingState.selectedAppIndex !== 1
            ? tabsContent[woTrackingState.selectedAppIndex].title
            : 'Detail',
        index: 2,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [woTrackingState.selectedAppIndex])

  // Cleanup function to dispatch reset action when component is unmounted
  useEffect(() => {
    return () => {
      dispatch(woTrackingActions.resetState())

      dispatch(woLaborActions.resetState())
      dispatch(woMaterialsActions.resetState())
      dispatch(woToolsActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TabsWrapper
      defaultIndex={woTrackingState.selectedAppIndex}
      selectedIndex={woTrackingState.selectedAppIndex}
      content={tabsContent}
      chooseActionMenu={chooseActionMenu}
      actionMenuCallback={(action) => {
        action()
      }}
      onSelect={(tabIndex) => {
        dispatch(
          woTrackingActions.setSelectedAppIndexAndAction({
            index: tabIndex,
            action: 'Read',
          }),
        )
      }}
    />
  )
}

export default WOTrackingTab
