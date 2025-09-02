import React, { useEffect } from 'react'
import OrganizationSiteForm from './components/OrganizationSiteForm'
import OrganizationSiteList from './components/OrganizationSiteList'
import { useDispatch } from 'react-redux'
import { organizationActions } from '../slices/organizationSlices'

const OrganizationSites = ({ mode, setAction, setTabIndex }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(organizationActions.resetSite())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {mode === 'Read' && (
        <OrganizationSiteList setAction={setAction} setTabIndex={setTabIndex} mode={mode} />
      )}
      {mode === 'Delete' && (
        <OrganizationSiteList setAction={setAction} setTabIndex={setTabIndex} mode={mode} />
      )}
      {mode === 'Create' && (
        <OrganizationSiteForm setAction={setAction} setTabIndex={setTabIndex} mode={mode} />
      )}
      {mode === 'Update' && (
        <OrganizationSiteForm setAction={setAction} setTabIndex={setTabIndex} mode={mode} />
      )}
    </div>
  )
}

export default OrganizationSites
