import React, { Fragment } from 'react'
import UserDetails from './UserDetails'
import UserForm from './UserForm'

const UserIndex = ({ mode, setAction, setTabIndex }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <UserDetails mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <UserForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default UserIndex
