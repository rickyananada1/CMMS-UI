import React from 'react'
import useDeleteConfirmation from './useDeleteConfirmation'

const DeleteConfirmation = ({
  setAction,
  setTabIndex, // don't pass this prop to not change tab index after delete
  setSelectedRow,
  data_id,
  data_name,
  data_parent_id,
  deleteService,
  viewMode,
  tableRef,
  deleteBody,
}) => {
  useDeleteConfirmation({
    setAction,
    setTabIndex,
    setSelectedRow,
    data_id,
    data_name,
    data_parent_id,
    deleteService,
    viewMode,
    tableRef,
    deleteBody,
  })

  return <div className="hidden"></div>
}

export default DeleteConfirmation
