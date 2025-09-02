import React, { Fragment } from 'react'
import ChildernOfWorkOrderList from './ChildernOfWorkOrderList'
import ChildernOfWorkOrderForm from './ChildernOfWorkOrderForm'

const ChildernOfWorkOrder = ({ mode, setAction }) => {
  return (
    <Fragment>
      {mode === 'Read' && <ChildernOfWorkOrderList mode={mode} setAction={setAction} />}
      {mode === 'Delete' && <ChildernOfWorkOrderList mode={mode} setAction={setAction} />}
      {mode === 'Create' && <ChildernOfWorkOrderForm mode={mode} setAction={setAction} />}
      {mode === 'Update' && <ChildernOfWorkOrderForm mode={mode} setAction={setAction} />}
    </Fragment>
  )
}

export default ChildernOfWorkOrder
