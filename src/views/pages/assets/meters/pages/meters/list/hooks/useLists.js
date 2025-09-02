import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'src/hooks/useDebounce'
import { metersActions } from '../../slices/metersSlices'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDownloadMeters } from '../services'

const useLists = () => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.meters?.selectedMeter)

  const downloadMetersService = useDownloadMeters({})

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const setSelectedRow = (param) => {
    dispatch(metersActions.setSelectedMeter(param))
  }

  const setTabIndex = (tabIndex) => {
    dispatch(
      metersActions.setSelectedAppIndexAndAction({
        index: tabIndex,
        action: 'Read',
      }),
    )
  }

  const downloadMeters = async () => {
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
        const column_names = ['meter_name', 'meter_description', 'meter_type']

        await downloadMetersService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'meters.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Meters downloaded successfully.`,
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
    setTabIndex,
    tableRef,
    handleSearch,
    searchDebounce,
    downloadMeters,
  }
}

export default useLists
