/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import LocationSafetyHazardousMaterialsList from './LocationSafetyHazardousMaterialsList'
import LocationSafetyHazardousMaterialsForm from './LocationSafetyHazardousMaterialsForm'
import LocationSafetyHazardousMaterialsModalDelete from './LocationSafetyHazardousMaterialsModalDelete'

const LocationSafetyHazardousMaterials = ({
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
        <LocationSafetyHazardousMaterialsList
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          isRefetchList={isRefetchList}
          setIsRefetchList={setIsRefetchList}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <LocationSafetyHazardousMaterialsForm
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
        />
      )}
      {mode === 'Delete' && (
        <LocationSafetyHazardousMaterialsModalDelete
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

export default LocationSafetyHazardousMaterials
