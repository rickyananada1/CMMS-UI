import React, { Fragment } from 'react'
import AssetMetersList from './AssetMetersList'
import AssetMetersForm from './AssetMetersForm'

const AssetMetersIndex = ({ mode, setAction, setTabIndex }) => {
  return (
    <Fragment>
      {mode === 'Read' && (
        <AssetMetersList mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {mode === 'Delete' && (
        <AssetMetersList mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <AssetMetersForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default AssetMetersIndex
