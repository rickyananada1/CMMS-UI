import React, { Fragment } from 'react'
import TaskForWorkOrderList from './TaskForWorkOrderList'
import TaskForWorkOrderForm from './TaskForWorkOrderForm'
import TaskForWorkOrderDelete from './TaskForWorkOrderDelete'

const TaskForWorkOrder = ({ mode, setAction }) => {
  return (
    <Fragment>
      {mode === 'Read' && <TaskForWorkOrderList />}
      {mode === 'Delete' && (
        <Fragment>
          <TaskForWorkOrderList />
          <TaskForWorkOrderDelete initialVisible={true} setAction={setAction} />
        </Fragment>
      )}
      {mode === 'Create' && <TaskForWorkOrderForm mode={mode} setAction={setAction} />}
      {mode === 'Update' && <TaskForWorkOrderForm mode={mode} setAction={setAction} />}
    </Fragment>
  )
}

export default TaskForWorkOrder
