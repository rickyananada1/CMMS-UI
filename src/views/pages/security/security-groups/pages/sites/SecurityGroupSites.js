/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'

import SecurityGroupSitesCreate from './SecurityGroupSitesCreate'
import SecurityGroupSitesEdit from './SecurityGroupSitesEdit'

import SecurityGroupSitesList from './SecurityGroupSitesList'

const SecurityGroupSites = ({ mode, setAction, visible, setVisible, setTabIndex }) => {
  return (
    <Fragment>
      {mode === 'Read' && <SecurityGroupSitesList visible={visible} setVisible={setVisible} />}
      {mode === 'Create' && (
        <div key="create-site">
          <SecurityGroupSitesCreate setAction={setAction} setTabIndex={setTabIndex} />
        </div>
      )}
      {mode === 'Update' && (
        <div key="update-site">
          <SecurityGroupSitesEdit setAction={setAction} setTabIndex={setTabIndex} />
        </div>
      )}
    </Fragment>
  )
}

export default SecurityGroupSites
