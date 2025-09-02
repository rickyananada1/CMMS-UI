import React, { Fragment } from 'react'
import MetersLocations from './MetersLocations'

const MetersLocationsIndex = ({ mode, setAction, setTabIndex }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <MetersLocations mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default MetersLocationsIndex
