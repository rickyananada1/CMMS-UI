import React from 'react'
import OrganizationDetail from './components/OrganizationDetail'
import OrganizationForm from './components/OrganizationForm'

const OrganizationInfo = ({ mode, setAction, setTabIndex }) => {
  return (
    <div>
      {mode === 'Read' && (
        <OrganizationDetail mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <OrganizationForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </div>
  )
}

export default OrganizationInfo
