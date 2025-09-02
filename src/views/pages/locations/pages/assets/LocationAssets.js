import React, { Fragment } from 'react'
import LocationAssetsList from './LocationAssetsList'

const Location = ({ mode, setAction, setTabIndex, visible, setVisible }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <LocationAssetsList mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default Location
