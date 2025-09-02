/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import AssetsSafetyRelatedAssetsList from './AssetsSafetyRelatedAssetsList'
import AssetsSafetyRelatedAssetsForm from './AssetsSafetyRelatedAssetsForm'
import AssetsSafetyRelatedAssetsModalDelete from './AssetsSafetyRelatedAssetsModalDelete'

const AssetsSafetyRelatedAssets = ({
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
        <AssetsSafetyRelatedAssetsList
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          isRefetchList={isRefetchList}
          setIsRefetchList={setIsRefetchList}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <AssetsSafetyRelatedAssetsForm
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
        />
      )}
      {mode === 'Delete' && (
        <AssetsSafetyRelatedAssetsModalDelete
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

export default AssetsSafetyRelatedAssets
