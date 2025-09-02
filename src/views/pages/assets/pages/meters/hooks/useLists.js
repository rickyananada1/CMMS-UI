import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'src/hooks/useDebounce'
import { useDeleteAssetMeter, useDownloadAssetMeter, useGetAssetMeter } from '../services'
import { assetActions } from '../../../slices/assetSlices'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'

const useLists = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)

  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)
  const selectedAssetMeter = useSelector((state) => state.assets?.selectedAssetMeter)
  const selectedAppIndex = useSelector((state) => state.assets?.selectedAppIndex)
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const getAssetMeterService = useGetAssetMeter()

  const downloadAssetMeterService = useDownloadAssetMeter({
    id: selectedRow?.asset_id,
  })

  const getDetails = async (id) => {
    var details = {}
    await getAssetMeterService
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

  const setSelectedAssetMeter = (param) => {
    dispatch(assetActions.setSelectedAssetMeter(param))
  }

  useEffect(() => {
    if (mode === 'Delete') {
      deleteData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  const deleteAssetMeter = useDeleteAssetMeter()

  const deleteData = () => {
    Notification.fire({
      icon: 'warning',
      html: `Do you want to delete ${selectedAssetMeter?.meter}`,
      title: 'Are you sure?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteAssetMeter
          .mutateAsync({
            id: selectedAssetMeter?.asset_meter_id,
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
            setSelectedAssetMeter(null)
            setAction('Read')
            setTabIndex(4)
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
        setTabIndex(4)
      }
    })
  }

  const downloadAssetMeter = async () => {
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

        await downloadAssetMeterService
          .mutateAsync({
            id: selectedRow?.asset_id,
            data: {
              site_id: selectedRow?.site_id,
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'asset_meters.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Asset Meters downloaded successfully.`,
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
    deleteData,
    downloadAssetMeter,
    selectedAssetMeter,
    setSelectedAssetMeter,
  }
}

export default useLists
