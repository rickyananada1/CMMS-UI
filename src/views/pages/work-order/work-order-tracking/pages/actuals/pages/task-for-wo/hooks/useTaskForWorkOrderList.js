import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDownloadTasks, useGetTaskForWorkOrder_ } from '../services'
import { woTaskActions } from '../slices/woTaskSlices'
import { downloadFileContentDisposition } from 'src/utils/helper'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useDebounce } from 'src/hooks/useDebounce'

const useTaskForWorkOrderList = () => {
  const Notification = withReactContent(Swal)

  const tableRef = useRef()
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const selectedRow = useSelector((state) => state.woTracking?.selectedWorkOrder)
  const getTaskForWorkOrder_ = useGetTaskForWorkOrder_({
    id: selectedRow?.work_order_id,
  })
  const selectedTaskRow = useSelector((state) => state.woTask?.selectedGroup)

  const setSelectedTaskRow = (param) => {
    dispatch(woTaskActions.setSelectedGroup(param))
  }

  const downloadTaskService = useDownloadTasks({
    id: selectedRow?.work_order_id,
  })

  const downloadTask = async () => {
    Notification.fire({
      icon: 'info',
      text: 'Are you sure to download ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const column_names = ['sequence', 'task', 'summary', 'duration_in_minute', 'status']

        await downloadTaskService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'task_actuals.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Work Order Actuals - Tasks downloaded successfully.`,
            })
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Oops...!',
              text: err?.response?.data?.message,
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
          })
      }
    })
  }

  return {
    tableRef,
    selectedRow,
    getTaskForWorkOrder_,
    selectedTaskRow,
    setSelectedTaskRow,
    downloadTask,
    setSearch,
    searchDebounce,
  }
}

export default useTaskForWorkOrderList
