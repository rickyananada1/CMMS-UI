import React, { Fragment } from 'react'
import SecurityGroupGroupDetails from './SecurityGroupGroupDetails'
import SecurityGroupGroupForm from './SecurityGroupGroupForm'

const SecurityGroupGroup = ({ mode, setAction, setTabIndex }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <SecurityGroupGroupDetails mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <SecurityGroupGroupForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default SecurityGroupGroup
