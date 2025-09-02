import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { locationsActions } from '../../../slices/locationsSlices'
import { useDebounce } from 'src/hooks/useDebounce'
import { useDownloadLocations } from '../services/downloadLocations'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'

const useLocationsLists = () => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.locations?.selectedLocation)

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const downloadLocationsService = useDownloadLocations({})

  const setSelectedRow = (param) => {
    dispatch(locationsActions.setSelectedLocation(param))
    dispatch(locationsActions.setSelectedAppIndex(1))
  }

  const downloadLocations = async () => {
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
          'location',
          'location_description',
          'location_priority',
          'location_status',
          'location_type',
          'site',
        ]

        await downloadLocationsService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'locations.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Locations downloaded successfully.`,
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
    downloadLocations,
  }
}

export default useLocationsLists
