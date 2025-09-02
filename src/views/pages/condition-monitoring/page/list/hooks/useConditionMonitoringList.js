import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'src/hooks/useDebounce'
import { conditionMonitoringActions } from '../../../slices/conditionMonitoringSlices'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDownloadConditionMonitoring } from '../services'

const useConditionMonitoring = () => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.conditionMonitoring?.selectedConditionMonitoring)

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const downloadConditionMonitoringService = useDownloadConditionMonitoring({})

  const setSelectedRow = (param) => {
    dispatch(conditionMonitoringActions.setSelectedConditionMonitoring(param))
    dispatch(conditionMonitoringActions.setSelectedAppIndex(1))
  }

  const downloadConditionMonitoring = async () => {
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
          'point_num',
          'point_description',
          'location',
          'asset_num',
          'meter_name',
          'site',
        ]

        await downloadConditionMonitoringService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'condition_monitoring.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Condition Monitoring downloaded successfully.`,
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
    downloadConditionMonitoring,
  }
}

export default useConditionMonitoring
