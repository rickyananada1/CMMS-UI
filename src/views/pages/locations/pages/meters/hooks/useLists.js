import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'src/hooks/useDebounce'
import { useDeleteLocationMeter, useDownloadLocationMeter, useGetLocationMeter } from '../services'
import { locationsActions } from '../../../slices/locationsSlices'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'

const useLists = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)

  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.locations?.selectedLocation)
  const selectedLocationMeter = useSelector((state) => state.locations?.selectedLocationMeter)
  const selectedAppIndex = useSelector((state) => state.locations?.selectedAppIndex)
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const getLocationMeterService = useGetLocationMeter()

  const downloadLocationMeterService = useDownloadLocationMeter({
    id: selectedRow?.location_id,
  })

  const getDetails = async (id) => {
    var details = {}
    await getLocationMeterService
      .mutateAsync({
        id: id,
      })
      .then((res) => {
        if (res.status === 200) {
          details = res.data.data
          details['finished_loading'] = true
        }
      })
      .catch((err) => {
        console.error(err)
        details['is_error'] = true
      })
    return details
  }

  const editData = (id, meter_name) => {
    dispatch(
      locationsActions.setSelectedLocationMeter({ meter_name: meter_name, location_meter_id: id }),
    )
    dispatch(locationsActions.setSelectedAppAction('Update'))
  }

  const setSelectedLocationMeter = (param) => {
    dispatch(locationsActions.setSelectedLocationMeter(param))
  }

  useEffect(() => {
    if (mode === 'Delete') {
      deleteData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  const deleteLocationMeter = useDeleteLocationMeter()

  const deleteData = () => {
    Notification.fire({
      icon: 'warning',
      html: `Do you want to delete ${selectedLocationMeter?.meter}`,
      title: 'Are you sure?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteLocationMeter
          .mutateAsync({
            id: selectedLocationMeter?.location_meter_id,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: 'Meter deleted successfully.',
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
            setSelectedLocationMeter(null)
            setAction('Read')
            setTabIndex(5)
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
      } else {
        setAction('Read')
        setTabIndex(5)
      }
    })
  }

  const downloadLocationMeter = async () => {
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
          'sequence',
          'meter_group',
          'meter',
          'meter_description',
          'meter_type',
          'uom',
          'is_active',
        ]

        await downloadLocationMeterService
          .mutateAsync({
            id: selectedRow?.location_id,
            data: {
              site_id: selectedRow?.site_id,
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'location_meters.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Location Meters downloaded successfully.`,
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

  useEffect(() => {
    tableRef?.current?.setPage(1)
  }, [selectedAppIndex])

  return {
    setSearch,
    selectedRow,
    tableRef,
    handleSearch,
    searchDebounce,
    getDetails,
    editData,
    deleteData,
    downloadLocationMeter,
    selectedLocationMeter,
    setSelectedLocationMeter,
  }
}

export default useLists
