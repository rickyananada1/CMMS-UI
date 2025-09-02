import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDownloadTasks } from '../services'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDebounce } from 'src/hooks/useDebounce'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { quickReportingActions } from 'src/views/pages/work-order/quick-reporting/slices/quickReportingSlices'

const useQRTaskList = () => {
  const Notification = withReactContent(Swal)

  const tableRef = useRef()
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const selectedRow = useSelector((state) => state.quickReporting?.selectedWorkOrder)
  const selectedTaskRow = useSelector((state) => state.quickReporting?.selectedTask)

  const setSelectedTaskRow = (param) => {
    dispatch(quickReportingActions.setSelectedTask(param))
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
        const column_names = [
          'sequence',
          'task',
          'description',
          'duration_in_minute',
          'measurement_point',
          'measurement_value',
          'measurement_date',
          'status',
        ]

        await downloadTaskService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'quick_reporting_task.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Quick Reporting - Tasks downloaded successfully.`,
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
    selectedTaskRow,
    setSelectedTaskRow,
    downloadTask,
    setSearch,
    searchDebounce,
  }
}

export default useQRTaskList
