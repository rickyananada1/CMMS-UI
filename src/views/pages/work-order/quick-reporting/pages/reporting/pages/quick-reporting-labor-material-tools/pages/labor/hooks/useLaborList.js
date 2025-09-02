import { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDebounce } from 'src/hooks/useDebounce'
import { useDownloadLabor, useGetLabor_ } from '../services'
import { quickReportingActions } from 'src/views/pages/work-order/quick-reporting/slices/quickReportingSlices'

const useLaborList = () => {
  const Notification = withReactContent(Swal)

  const tableRef = useRef()
  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.quickReporting?.selectedWorkOrder)
  const selectedLaborRow = useSelector((state) => state.quickReporting?.selectedLabor)
  const selectedTaskRow = useSelector((state) => state.quickReporting?.selectedTask)

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const getLabor_ = useGetLabor_({
    id: selectedRow?.work_order_id,
  })

  const downloadLaborService = useDownloadLabor({
    id: selectedTaskRow?.work_order_task_id,
  })

  const setSelectedLaborRow = (param) => {
    dispatch(quickReportingActions.setSelectedLabor(param))
  }

  const downloadLabor = async () => {
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
          'task',
          'craft',
          'skill_level',
          'vendor',
          'quantity',
          'labor',
          'regular_hours',
          'rate',
          'line_cost',
        ]

        await downloadLaborService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'quick_reporting_labor.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Quick Reporting - Labor downloaded successfully.`,
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
    selectedLaborRow,
    setSelectedLaborRow,
    getLabor_,
    selectedTaskRow,
    downloadLabor,
    searchDebounce,
    setSearch,
  }
}

export default useLaborList
