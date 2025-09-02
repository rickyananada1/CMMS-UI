import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { downloadFileContentDisposition } from 'src/utils/helper'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDownloadMeterCondition } from '../services/downloadMeterCondition'
import { useDebounce } from 'src/hooks/useDebounce'

const useMetersCondition = () => {
  const Notification = withReactContent(Swal)

  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.meters?.selectedMeter)

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const downloadMeterConditionService = useDownloadMeterCondition({
    id: selectedRow?.location_id,
  })

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const downloadMeterCondition = async () => {
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
          'asset_num',
          'location',
          'site',
          'site_description',
        ]

        await downloadMeterConditionService
          .mutateAsync({
            id: selectedRow?.meter_id,
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'meter-condition-monitoring.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Meter Condition Monitoring downloaded successfully.`,
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
    downloadMeterCondition,
    searchDebounce,
    handleSearch,
  }
}

export default useMetersCondition
