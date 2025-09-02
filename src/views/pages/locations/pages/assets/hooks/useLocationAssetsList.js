import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { locationsActions } from '../../../slices/locationsSlices'
import { useDebounce } from 'src/hooks/useDebounce'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDownloadLocationAssets } from '../services'

const useLocationAssetsList = () => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.locations?.selectedLocation)

  const downloadLocationAssetsService = useDownloadLocationAssets({
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

  const downloadLocationAssets = async () => {
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
          'parent_asset_num',
          'parent_asset_description',
          'rotating_item',
          'rotating_item_description',
          'asset_up',
          'calendar',
        ]

        await downloadLocationAssetsService
          .mutateAsync({
            id: selectedRow?.location_id,
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'assets.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Assets downloaded successfully.`,
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
    downloadLocationAssets,
    startDate,
    endDate,
    handleRangeChange,
    clearDates,
  }
}

export default useLocationAssetsList
