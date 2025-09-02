/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import LocationSafetyRelatedAssetsList from './LocationSafetyRelatedAssetsList'
import LocationSafetyRelatedAssetsForm from './LocationSafetyRelatedAssetsForm'
import LocationSafetyRelatedAssetsModalDelete from './LocationSafetyRelatedAssetsModalDelete'

const LocationSafetyRelatedAssets = ({
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
        <LocationSafetyRelatedAssetsList
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          visible={visible}
          setVisible={setVisible}
          isRefetchList={isRefetchList}
          setIsRefetchList={setIsRefetchList}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <LocationSafetyRelatedAssetsForm
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
        />
      )}
      {mode === 'Delete' && (
        <LocationSafetyRelatedAssetsModalDelete
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

export default LocationSafetyRelatedAssets
