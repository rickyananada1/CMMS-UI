import React, { Fragment } from 'react'
import RelationshipDetails from './RelationshipDetails'
import RelationshipForm from './RelationshipForm'

const RelationshipIndex = ({ mode, setAction, setTabIndex }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <RelationshipDetails mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <RelationshipForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default RelationshipIndex
