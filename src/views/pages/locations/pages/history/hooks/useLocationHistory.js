import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { locationsActions } from '../../../slices/locationsSlices'
import { useDebounce } from 'src/hooks/useDebounce'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDownloadLocationHistory } from '../services'

const useLocationHistory = () => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.locations?.selectedLocation)

  const downloadLocationHistoryService = useDownloadLocationHistory({
    id: selectedRow?.location_id,
  })

  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleRangeChange = (dates) => {
    setDateRange(dates)
  }

  const clearDates = () => {
    setDateRange([null, null])
  }

  const setSelectedRow = (param) => {
    dispatch(locationsActions.setSelectedLocation(param))
  }

  const downloadLocationHistory = async () => {
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
          'asset_num',
          'asset_description',
          'from_location',
          'from_location_description',
          'to_location',
          'to_location_description',
          'from_site',
          'from_site_description',
          'to_site',
          'to_site_description',
          'from_parent_asset_num',
          'from_parent_asset_description',
          'to_parent_asset_num',
          'to_parent_asset_description',
        ]

        await downloadLocationHistoryService
          .mutateAsync({
            id: selectedRow?.location_id,
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'history_locations.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `History Locations downloaded successfully.`,
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
    downloadLocationHistory,
    startDate,
    endDate,
    handleRangeChange,
    clearDates,
  }
}

export default useLocationHistory
