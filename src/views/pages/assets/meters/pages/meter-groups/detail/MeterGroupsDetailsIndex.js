import React, { Fragment } from 'react'
import MeterGroupsDetails from './MeterGroupsDetails'
import MeterGroupsForm from './MeterGroupsForm'
import MeterInGroupsForm from './MeterInGroupsForm'

const MeterGroupsDetailsIndex = ({ mode, setAction, setTabIndex }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <MeterGroupsDetails mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'Create' || mode === 'Update-MeterGroup') && (
        <MeterGroupsForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {mode === 'Update-MeterInGroup' && (
        <MeterInGroupsForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default MeterGroupsDetailsIndex
