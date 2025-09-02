import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'src/hooks/useDebounce'
import { assetActions } from '../../../slices/assetSlices'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDownloadAssets } from '../services'

const useList = () => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef(null)
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)

  const downloadAssetsService = useDownloadAssets({})

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const setSelectedRow = (param) => {
    dispatch(assetActions.setSelectedAsset(param))
    dispatch(assetActions.setSelectedAppIndex(1))
  }

  const downloadAssets = async () => {
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
          'location',
          'kks_number',
          'parent_asset_num',
          'rotating_item',
          'status',
          'site',
        ]

        await downloadAssetsService
          .mutateAsync({
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
    tableRef,
    setSearch,
    selectedRow,
    setSelectedRow,
    handleSearch,
    searchDebounce,
    downloadAssets,
  }
}

export default useList
