import React, { Fragment } from 'react'
import MetersCondition from './MetersCondition'

const MetersConditionIndex = ({ mode, setAction, setTabIndex }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <MetersCondition mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default MetersConditionIndex
