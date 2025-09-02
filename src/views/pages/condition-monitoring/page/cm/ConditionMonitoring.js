import React, { Fragment } from 'react'
import ConditionMonitoringDetail from './ConditionMonitoringDetail'
import ConditionMonitoringForm from './ConditionMonitoringForm'
import ConditionMonitoringDelete from './ConditionMonitoringDelete'

const ConditionMonitoring = ({ mode, setAction, setTabIndex }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <Fragment>
          <ConditionMonitoringDetail mode={mode} setTabIndex={setTabIndex} />
          <ConditionMonitoringDelete mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
        </Fragment>
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <ConditionMonitoringForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default ConditionMonitoring
