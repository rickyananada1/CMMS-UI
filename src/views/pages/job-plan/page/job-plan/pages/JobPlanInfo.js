import React, { Fragment } from 'react'
import JobPlanDetail from './JobPlanDetail'
import JobPlanForm from './JobPlanForm'
import LaborForm from './LaborForm'
import MaterialForm from './MaterialForm'
import ToolForm from './ToolForm'
import JobPlanTaskForm from './JobPlanTaskForm'

const JobPlanInfo = ({ mode, setAction, setTabIndex, visible, setVisible }) => {
  return (
    <Fragment>
      {(mode === 'Read' ||
        mode === 'Delete' ||
        mode === 'DeleteJobPlanTask' ||
        mode === 'DeleteLabor' ||
        mode === 'DeleteMaterial' ||
        mode === 'DeleteTool') && (
        <JobPlanDetail setAction={setAction} setTabIndex={setTabIndex} mode={mode} />
      )}
      {(mode === 'Create' || mode === 'Update' || mode === 'Duplicate') && (
        <JobPlanForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'CreateJobPlanTask' || mode === 'UpdateJobPlanTask') && (
        <JobPlanTaskForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'CreateLabor' || mode === 'UpdateLabor') && (
        <LaborForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'CreateMaterial' || mode === 'UpdateMaterial') && (
        <MaterialForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'CreateTool' || mode === 'UpdateTool') && (
        <ToolForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default JobPlanInfo
