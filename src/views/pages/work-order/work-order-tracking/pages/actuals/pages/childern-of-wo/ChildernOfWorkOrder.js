import React, { Fragment } from 'react'
import ChildernOfWorkOrderList from './ChildernOfWorkOrderList'
import ChildernOfWorkOrderForm from './ChildernOfWorkOrderForm'
import ChildernOfWorkOrderDelete from './ChildernOfWorkOrderDelete'

const ChildernOfWorkOrder = ({ mode, setAction }) => {
  return (
    <Fragment>
      {mode === 'Read' && <ChildernOfWorkOrderList />}
      {mode === 'Delete' && (
        <Fragment>
          <ChildernOfWorkOrderList />
          <ChildernOfWorkOrderDelete initialVisible={true} setAction={setAction} />
        </Fragment>
      )}
      {mode === 'Create' && <ChildernOfWorkOrderForm mode={mode} setAction={setAction} />}
      {mode === 'Update' && <ChildernOfWorkOrderForm mode={mode} setAction={setAction} />}
    </Fragment>
  )
}

export default ChildernOfWorkOrder
