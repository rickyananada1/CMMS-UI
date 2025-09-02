import React, { Fragment } from 'react'
import LocationMetersList from './LocationMetersList'
import LocationMetersForm from './LocationMetersForm'

const LocationMetersIndex = ({ mode, setAction, setTabIndex }) => {
  return (
    <Fragment>
      {mode === 'Read' && (
        <LocationMetersList mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {mode === 'Delete' && (
        <LocationMetersList mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <LocationMetersForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default LocationMetersIndex
