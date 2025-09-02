import React, { Fragment } from 'react'
import MetersAssets from './MetersAssets'

const MetersAssetsIndex = ({ mode, setAction, setTabIndex }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <MetersAssets mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default MetersAssetsIndex
