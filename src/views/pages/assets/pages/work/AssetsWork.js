import React, { Fragment } from 'react'
import AssetsWorkList from './AssetsWorkList'
import AssetsWorkForm from './AssetsWorkForm'
import AssetsWorkModalDownload from './AssetsWorkModalDownload'

const AssetsWork = ({
  mode,
  setAction,
  setTabIndex,
  visible,
  setVisible,
  visibleDownload,
  setVisibleDownload,
  setIsRefetchList,
}) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <AssetsWorkList
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          visible={visible}
          setVisible={setVisible}
          visibleDownload={visibleDownload}
          setVisibleDowload={setVisibleDownload}
        />
      )}
      {mode === 'Read' && (
        <AssetsWorkModalDownload
          visibleDownload={visibleDownload}
          setVisibleDownload={setVisibleDownload}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <AssetsWorkForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default AssetsWork
