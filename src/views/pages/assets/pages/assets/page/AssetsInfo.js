import React, { Fragment } from 'react'
import AssetsDetail from './AssetsDetail'
import AssetsForm from './AssetsForm'
import AssetsMove from './AssetsMove'
import AssetsDuplicate from './AssetsDuplicate'

const AssetsInfo = ({ mode, setAction, setTabIndex, visible, setVisible }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete' || mode === 'Move') && (
        <Fragment>
          <AssetsDetail setAction={setAction} setTabIndex={setTabIndex} mode={mode} />
        </Fragment>
      )}
      {mode === 'Move' && (
        <AssetsMove
          initialVisible={visible}
          setVisible={setVisible}
          setAction={setAction}
          setTabIndex={setTabIndex}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <AssetsForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {mode === 'Duplicate' && (
        <AssetsDuplicate mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default AssetsInfo
