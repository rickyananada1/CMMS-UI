import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { jobPlanActions } from './slices/jobPlanSlices'
import { TabsWrapper } from 'src/components/elements/tabs'
import JobPlanList from './page/list/JobPlanList'
import JobPlanInfo from './page/job-plan/pages/JobPlanInfo'
import { breadcrumbActions } from 'src/store/actions'

const JobPlanTab = () => {
  const dispatch = useDispatch()
  const jobPlanState = useSelector((state) => state.jobPlan)

  const tabsContent = [
    {
      title: 'List',
      element: (
        <JobPlanList
          mode={jobPlanState?.selectedAppAction}
          setAction={(param) => dispatch(jobPlanActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(jobPlanActions.setSelectedAppIndex(param))}
        />
      ),
    },
    {
      title: 'Job Plan',
      disabled: !jobPlanState?.selectedJobPlan,
      element: (
        <JobPlanInfo
          mode={jobPlanState?.selectedAppAction}
          setAction={(param) => dispatch(jobPlanActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(jobPlanActions.setSelectedAppIndex(param))}
        />
      ),
    },
  ]

  const chooseActionMenu = [
    {
      group: 'Job Plan',
      menu: [
        {
          title: 'New Job Plan',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Job Plan',
          app_action: 'Create',
          action: () => {
            dispatch(
              jobPlanActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Job Plan',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Job Plan',
          app_action: 'Update',
          disabled: !jobPlanState?.selectedJobPlan,
          action: () => {
            dispatch(
              jobPlanActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Job Plan',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Job Plan',
          app_action: 'Delete',
          disabled: !jobPlanState?.selectedJobPlan,
          action: () => {
            dispatch(
              jobPlanActions.setSelectedAppIndexAndAction({
                index: 0,
                action: 'Delete',
              }),
            )
          },
        },
        {
          title: 'Duplicate Job Plan',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Job Plan',
          app_action: 'Create',
          disabled: !jobPlanState?.selectedJobPlan,
          action: () => {
            dispatch(
              jobPlanActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Duplicate',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Job Plan Task',
      menu: [
        {
          title: 'New Job Plan Task',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Job Plan',
          app_action: 'Update',
          disabled: !jobPlanState?.selectedJobPlan,
          action: () => {
            dispatch(
              jobPlanActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'CreateJobPlanTask',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Job Plan Task',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Job Plan',
          app_action: 'Update',
          disabled: !jobPlanState?.selectedJobPlan || !jobPlanState?.selectedTask,
          action: () => {
            dispatch(
              jobPlanActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'UpdateJobPlanTask',
              }),
            )
          },
        },
        {
          title: 'Delete Job Plan Task',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Job Plan',
          app_action: 'Update',
          disabled: !jobPlanState?.selectedJobPlan || !jobPlanState?.selectedTask,
          action: () => {
            dispatch(
              jobPlanActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'DeleteJobPlanTask',
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
          app_name: 'Job Plan',
          app_action: 'Update',
          disabled: !jobPlanState?.selectedJobPlan,
          action: () => {
            dispatch(
              jobPlanActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'CreateLabor',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Labor',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Job Plan',
          app_action: 'Update',
          disabled: !jobPlanState?.selectedJobPlan || !jobPlanState?.selectedLabor,
          action: () => {
            dispatch(
              jobPlanActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'UpdateLabor',
              }),
            )
          },
        },
        {
          title: 'Delete Labor',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Job Plan',
          app_action: 'Update',
          disabled: !jobPlanState?.selectedJobPlan || !jobPlanState?.selectedLabor,
          action: () => {
            dispatch(
              jobPlanActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'DeleteLabor',
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
          app_name: 'Job Plan',
          app_action: 'Update',
          disabled: !jobPlanState?.selectedJobPlan,
          action: () => {
            dispatch(
              jobPlanActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'CreateMaterial',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Materials',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Job Plan',
          app_action: 'Update',
          disabled: !jobPlanState?.selectedJobPlan || !jobPlanState?.selectedMaterial,
          action: () => {
            dispatch(
              jobPlanActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'UpdateMaterial',
              }),
            )
          },
        },
        {
          title: 'Delete Materials',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Job Plan',
          app_action: 'Update',
          disabled: !jobPlanState?.selectedJobPlan || !jobPlanState?.selectedMaterial,
          action: () => {
            dispatch(
              jobPlanActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'DeleteMaterial',
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
          app_name: 'Job Plan',
          app_action: 'Update',
          disabled: !jobPlanState?.selectedJobPlan,
          action: () => {
            dispatch(
              jobPlanActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'CreateTool',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Tools',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Job Plan',
          app_action: 'Update',
          disabled: !jobPlanState?.selectedJobPlan || !jobPlanState?.selectedTool,
          action: () => {
            dispatch(
              jobPlanActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'UpdateTool',
              }),
            )
          },
        },
        {
          title: 'Delete Tools',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Job Plan',
          app_action: 'Update',
          disabled: !jobPlanState?.selectedJobPlan || !jobPlanState?.selectedTool,
          action: () => {
            dispatch(
              jobPlanActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'DeleteTool',
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
          jobPlanState.selectedAppIndex !== 1
            ? tabsContent[jobPlanState.selectedAppIndex].title
            : 'Detail',
        index: 2,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobPlanState.selectedAppIndex])

  useEffect(() => {
    dispatch(jobPlanActions.resetState())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TabsWrapper
      defaultIndex={jobPlanState.selectedAppIndex}
      selectedIndex={jobPlanState.selectedAppIndex}
      content={tabsContent}
      chooseActionMenu={chooseActionMenu}
      actionMenuCallback={(action) => {
        action()
      }}
      onSelect={(tabIndex) => {
        dispatch(
          jobPlanActions.setSelectedAppIndexAndAction({
            index: tabIndex,
            action: 'Read',
          }),
        )
      }}
    />
  )
}

export default JobPlanTab
