import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { downloadFileContentDisposition } from 'src/utils/helper'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDownloadMeterLocations } from '../services/downloadMeterLocations'
import { useDebounce } from 'src/hooks/useDebounce'

const useMetersLocations = () => {
  const Notification = withReactContent(Swal)

  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.meters?.selectedMeter)

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const downloadMeterLocationsService = useDownloadMeterLocations({
    id: selectedRow?.location_id,
  })

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const downloadMeterLocations = async () => {
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
        const column_names = ['location', 'location_description', 'site', 'site_description']

        await downloadMeterLocationsService
          .mutateAsync({
            id: selectedRow?.meter_id,
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'meter-locations.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Meter Locations downloaded successfully.`,
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
    downloadMeterLocations,
    searchDebounce,
    handleSearch,
  }
}

export default useMetersLocations
