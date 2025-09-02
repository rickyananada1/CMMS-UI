import React, { Fragment } from 'react'
import SecurityGroupApplicationsLists from './SecurityGroupApplicationsLists'
import SecurityGroupApplicationsForm from './SecurityGroupApplicationsForm'

// eslint-disable-next-line react/prop-types
const SecurityGroupApplications = ({ mode, setAction, setTabIndex, visible, setVisible }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <SecurityGroupApplicationsLists
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          visible={visible}
          setVisible={setVisible}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <SecurityGroupApplicationsForm
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
        />
      )}
    </Fragment>
  )
}

export default SecurityGroupApplications
