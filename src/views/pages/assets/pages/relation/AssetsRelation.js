/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import AssetsRelationList from './AssetsRelationList'
import AssetsRelationForm from './AssetsRelationForm'

const AssetsRelation = ({ mode, setAction, setTabIndex, visible, setVisible }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <Fragment>
          <AssetsRelationList mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
        </Fragment>
      )}

      {(mode === 'Create' || mode === 'Update') && (
        <AssetsRelationForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default AssetsRelation
