/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import LocationSafetyLockOutTagOutList from './LocationSafetyLockOutTagOutList'
import LocationSafetyLockOutTagOutForm from './LocationSafetyLockOutTagOutForm'

const LocationSafetyLockOutTagOut = ({
  mode,
  setAction,
  setTabIndex,
  visible,
  setVisible,
  isRefetchList,
  setIsRefetchList,
}) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <LocationSafetyLockOutTagOutList
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          isRefetchList={isRefetchList}
          setIsRefetchList={setIsRefetchList}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <LocationSafetyLockOutTagOutForm
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
        />
      )}
    </Fragment>
  )
}

export default LocationSafetyLockOutTagOut
