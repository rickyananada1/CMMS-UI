import React from 'react'
import OrganizationAddressesForm from './components/OrganizationAddressesForm'
import AddressesList from './OrganizationAddressess'

const OrganizationAddressesInfo = ({ mode, setAction, setTabIndex }) => {
  return (
    <div>
      {(mode === 'Read' || mode === 'DeleteAddress') && (
        <AddressesList mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {mode === 'CreateAddress' && (
        <OrganizationAddressesForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {mode === 'UpdateAddress' && (
        <OrganizationAddressesForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </div>
  )
}

export default OrganizationAddressesInfo
