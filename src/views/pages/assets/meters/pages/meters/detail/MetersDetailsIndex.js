import React, { Fragment } from 'react'
import MetersDetails from './MetersDetails'
import MetersForm from './MetersForm'

const MetersDetailsIndex = ({ mode, setAction, setTabIndex }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <MetersDetails mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <MetersForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default MetersDetailsIndex
