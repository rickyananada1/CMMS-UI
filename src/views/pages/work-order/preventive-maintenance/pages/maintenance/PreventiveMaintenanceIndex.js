import React, { Fragment } from 'react'
import PreventiveMaintenanceDetails from './PreventiveMaintenanceDetails'
import PreventiveMaintenanceForm from './PreventiveMaintenanceForm'
import ManualWOForm from './ManualWOForm'

const PreventiveMaintenanceIndex = ({ mode, setAction, setTabIndex }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <PreventiveMaintenanceDetails mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <PreventiveMaintenanceForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {mode === 'Create PM WO' && (
        <ManualWOForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default PreventiveMaintenanceIndex
