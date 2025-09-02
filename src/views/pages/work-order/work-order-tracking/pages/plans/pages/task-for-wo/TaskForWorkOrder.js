import React, { Fragment } from 'react'
import TaskForWorkOrderList from './TaskForWorkOrderList'
import TaskForWorkOrderForm from './TaskForWorkOrderForm'

const TaskForWorkOrder = ({ mode, setAction }) => {
  return (
    <Fragment>
      {mode === 'Read' && <TaskForWorkOrderList mode={mode} setAction={setAction} />}
      {mode === 'Delete' && <TaskForWorkOrderList mode={mode} setAction={setAction} />}
      {mode === 'Create' && <TaskForWorkOrderForm mode={mode} setAction={setAction} />}
      {mode === 'Update' && <TaskForWorkOrderForm mode={mode} setAction={setAction} />}
    </Fragment>
  )
}

export default TaskForWorkOrder
