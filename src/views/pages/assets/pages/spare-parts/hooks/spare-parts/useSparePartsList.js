import { useRef, useState } from 'react'
import { useDownloadSpareParts, useGetSpareParts_ } from '../../services/spare-parts'
import { useSelector } from 'react-redux'
import { useDebounce } from 'src/hooks/useDebounce'
import { downloadFileContentDisposition } from 'src/utils/helper'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

const useSpareParts = () => {
  const Notification = withReactContent(Swal)

  const tableRef = useRef()
  const [search, setSearch] = useState('')
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)
  const getSpareParts = useGetSpareParts_({
    id: selectedRow?.asset_id,
  })

  const searchDebounce = useDebounce(search, 400)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const downloadSparePartsService = useDownloadSpareParts({
    id: selectedRow?.asset_id,
  })

  const downloadAssetsSpareparts = async () => {
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
        const column_names = ['item_num', 'description', 'quantity', 'remark']

        await downloadSparePartsService
          .mutateAsync({
            id: selectedRow?.asset_id,
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'asset_spareparts.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Asset Spare Parts downloaded successfully.`,
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
    getSpareParts,
    searchDebounce,
    handleSearch,
    downloadAssetsSpareparts,
    search,
  }
}

export default useSpareParts
