/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import AssetsSafetyHazardousMaterialsList from './AssetsSafetyHazardousMaterialsList'
import AssetsSafetyHazardousMaterialsForm from './AssetsSafetyHazardousMaterialsForm'
import AssetsSafetyHazardousMaterialsModalDelete from './AssetsSafetyHazardousMaterialsModalDelete'

const AssetsSafetyHazardousMaterials = ({
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
        <AssetsSafetyHazardousMaterialsList
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          isRefetchList={isRefetchList}
          setIsRefetchList={setIsRefetchList}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <AssetsSafetyHazardousMaterialsForm
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
        />
      )}
      {mode === 'Delete' && (
        <AssetsSafetyHazardousMaterialsModalDelete
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

export default AssetsSafetyHazardousMaterials
