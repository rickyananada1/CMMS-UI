import React, { Fragment } from 'react'
import FailureAnalysDetail from './FailureAnalysDetail'
import FailureAnalysForm from './FailureAnalysForm'

const FailureAnalysIndex = ({ mode, setAction, setTabIndex }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <FailureAnalysDetail mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <FailureAnalysForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default FailureAnalysIndex
