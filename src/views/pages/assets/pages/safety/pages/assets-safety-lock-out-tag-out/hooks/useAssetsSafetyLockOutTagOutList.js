import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { assetsSafetyActions } from '../../../slices/assetsSafetySlices'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDownloadAssetsSafetyLockOutTagOut } from '../services'
import { useDebounce } from 'src/hooks/useDebounce'

const useAssetsSafetyLockOutTagOutList = ({ isRefetchList, setIsRefetchList }) => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)
  const selectedSafetyTagOutRow = useSelector((state) => state.assetsSafety?.selectedSafetyTagOut)

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const downloadAssetsSafetyLockOutTagOutService = useDownloadAssetsSafetyLockOutTagOut({
    id: selectedRow?.asset_id,
  })

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const setSelectedSafetyTagOutRow = (param) => {
    dispatch(assetsSafetyActions.setSelectedSafetyTagOut(param))
  }

  const downloadAssetsSafetyLockOutTagOut = async () => {
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
        const column_names = ['hazard']

        await downloadAssetsSafetyLockOutTagOutService
          .mutateAsync({
            id: selectedRow?.asset_id,
            data: {
              column_names,
              site: selectedRow?.site_id,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'lock_out_tag_out.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Lock Out / Tag Out downloaded successfully.`,
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
    if (isRefetchList) {
      tableRef.current?.update()
      setIsRefetchList(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetchList])

  return {
    tableRef,
    selectedRow,
    selectedSafetyTagOutRow,
    setSelectedSafetyTagOutRow,
    downloadAssetsSafetyLockOutTagOut,
    searchDebounce,
    handleSearch,
  }
}

export default useAssetsSafetyLockOutTagOutList
