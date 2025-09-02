/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import AssetsSafetyLockOutTagOutList from './AssetsSafetyLockOutTagOutList'
import AssetsSafetyLockOutTagOutForm from './AssetsSafetyLockOutTagOutForm'

const AssetsSafetyLockOutTagOut = ({
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
        <AssetsSafetyLockOutTagOutList
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          isRefetchList={isRefetchList}
          setIsRefetchList={setIsRefetchList}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <AssetsSafetyLockOutTagOutForm
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
        />
      )}
    </Fragment>
  )
}

export default AssetsSafetyLockOutTagOut
