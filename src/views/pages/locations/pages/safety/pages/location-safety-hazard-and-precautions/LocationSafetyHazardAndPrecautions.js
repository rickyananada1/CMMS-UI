/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import LocationSafetyHazardAndPrecautionsList from './LocationSafetyHazardAndPrecautionsList'
import LocationSafetyHazardAndPrecautionsForm from './LocationSafetyHazardAndPrecautionsForm'
import LocationSafetyHazardAndPrecautionsModalDelete from './LocationSafetyHazardAndPrecautionsModalDelete'

const LocationSafetyHazardAndPrecautions = ({
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
        <LocationSafetyHazardAndPrecautionsList
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          isRefetchList={isRefetchList}
          setIsRefetchList={setIsRefetchList}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <LocationSafetyHazardAndPrecautionsForm
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
        />
      )}
      {mode === 'Delete' && (
        <LocationSafetyHazardAndPrecautionsModalDelete
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          visible={visible}
          setVisible={setVisible}
          setIsRefetchList={setIsRefetchList}
        />
      )}
    </Fragment>
  )
}

export default LocationSafetyHazardAndPrecautions
