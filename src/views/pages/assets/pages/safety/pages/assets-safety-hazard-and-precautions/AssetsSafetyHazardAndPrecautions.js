/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import AssetsSafetyHazardAndPrecautionsList from './AssetsSafetyHazardAndPrecautionsList'
import AssetsSafetyHazardAndPrecautionsForm from './AssetsSafetyHazardAndPrecautionsForm'
import AssetsSafetyHazardAndPrecautionsModalDelete from './AssetsSafetyHazardAndPrecautionsModalDelete'

const AssetsSafetyHazardAndPrecautions = ({
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
        <AssetsSafetyHazardAndPrecautionsList
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          isRefetchList={isRefetchList}
          setIsRefetchList={setIsRefetchList}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <AssetsSafetyHazardAndPrecautionsForm
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
        />
      )}
      {mode === 'Delete' && (
        <AssetsSafetyHazardAndPrecautionsModalDelete
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

export default AssetsSafetyHazardAndPrecautions
