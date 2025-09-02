import { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDebounce } from 'src/hooks/useDebounce'
import { useDownloadTools } from '../services'
import { quickReportingActions } from 'src/views/pages/work-order/quick-reporting/slices/quickReportingSlices'

const useToolsList = () => {
  const Notification = withReactContent(Swal)

  const tableRef = useRef()
  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.quickReporting?.selectedWorkOrder)
  const selectedToolsRow = useSelector((state) => state.quickReporting?.selectedTool)
  const selectedTaskRow = useSelector((state) => state.quickReporting?.selectedTask)

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const downloadToolsService = useDownloadTools({
    id: selectedTaskRow?.work_order_task_id,
  })

  const setSelectedToolsRow = (param) => {
    dispatch(quickReportingActions.setSelectedTool(param))
  }

  const downloadTools = async () => {
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
        const column_names = ['task', 'tool', 'description', 'quantity', 'unit_cost', 'line_cost']

        await downloadToolsService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'quick_reporting_tools.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Quick Reporting - Tools downloaded successfully.`,
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
    selectedToolsRow,
    setSelectedToolsRow,
    selectedTaskRow,
    downloadTools,
    searchDebounce,
    setSearch,
  }
}

export default useToolsList
