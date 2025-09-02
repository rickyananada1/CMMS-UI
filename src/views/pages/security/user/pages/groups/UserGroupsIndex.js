import React, { Fragment } from 'react'
import UserGroupsDetails from './UserGroupsDetails'
import UserGroupsForm from './UserGroupsForm'

const UserGroupsIndex = ({ mode, setAction, setTabIndex }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <UserGroupsDetails mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <UserGroupsForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default UserGroupsIndex
