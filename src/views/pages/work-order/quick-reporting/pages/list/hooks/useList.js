import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { quickReportingActions } from '../../../slices/quickReportingSlices'
import { useDebounce } from 'src/hooks/useDebounce'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDownloadQuickReporting } from '../services'

const useList = () => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.quickReporting?.selectedWorkOrder)

  const downloadQuickReportingService = useDownloadQuickReporting({})

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const setSelectedRow = (param) => {
    dispatch(quickReportingActions.setSelectedWorkOrder(param))
    dispatch(quickReportingActions.setSelectedAppIndex(1))
  }

  const resetSelectedTaskEtc = () => {
    dispatch(quickReportingActions.setSelectedTask(null))
    dispatch(quickReportingActions.setSelectedLabor(null))
    dispatch(quickReportingActions.setSelectedMaterial(null))
    dispatch(quickReportingActions.setSelectedTool(null))
    dispatch(quickReportingActions.setSelectedFailure(null))
    dispatch(quickReportingActions.setSelectedDetailTab(0))
  }

  const downloadQuickReporting = async () => {
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
          'work_order_code',
          'description',
          'location',
          'location_description',
          'asset_num',
          'asset_desc',
          'status',
          'scheduled_start',
          'work_priority',
          'site',
          'site_desc',
        ]

        await downloadQuickReportingService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'quick_reporting.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Quick Reporting downloaded successfully.`,
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
    setSearch,
    selectedRow,
    setSelectedRow,
    tableRef,
    handleSearch,
    searchDebounce,
    downloadQuickReporting,
    resetSelectedTaskEtc,
  }
}

export default useList
