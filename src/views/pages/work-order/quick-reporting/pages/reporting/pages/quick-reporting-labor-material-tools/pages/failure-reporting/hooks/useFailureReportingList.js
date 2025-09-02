import { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDebounce } from 'src/hooks/useDebounce'
import { useDownloadFailureCodes } from '../services'
import { quickReportingActions } from 'src/views/pages/work-order/quick-reporting/slices/quickReportingSlices'

const useFailureReportingList = () => {
  const Notification = withReactContent(Swal)

  const tableRef = useRef()
  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.quickReporting?.selectedWorkOrder)
  const selectedFailureRow = useSelector((state) => state.quickReporting?.selectedFailure)
  const selectedTaskRow = useSelector((state) => state.quickReporting?.selectedTask)

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const detailVisible = useSelector((state) => state.quickReporting?.detailFailureVisible)
  const setDetailVisible = (param) => {
    dispatch(quickReportingActions.setDetailFailureVisible(param))
  }

  const downloadFailureCodesService = useDownloadFailureCodes({
    id: selectedRow?.work_order_id,
  })

  const setSelectedFailureRow = (param) => {
    dispatch(quickReportingActions.setSelectedFailure(param))
  }

  const downloadFailureCodes = async () => {
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
        const column_names = ['failure_code', 'description', 'organization_name']

        await downloadFailureCodesService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'quick_reporting_failure_reporting.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Quick Reporting - Failure Reporting downloaded successfully.`,
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
    selectedFailureRow,
    setSelectedFailureRow,
    selectedTaskRow,
    downloadFailureCodes,
    searchDebounce,
    setSearch,
    detailVisible,
    setDetailVisible,
  }
}

export default useFailureReportingList
