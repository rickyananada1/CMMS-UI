import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { relationshipsActions } from '../../../slices/relationshipsSlice'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDebounce } from 'src/hooks/useDebounce'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDownloadRelationships } from '../services'

const useRelationshipsList = () => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.relationships?.selectedRelationship)

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const downloadRelationshipsService = useDownloadRelationships({})

  const setSelectedRow = (param) => {
    dispatch(relationshipsActions.setSelectedRelationship(param))
    dispatch(relationshipsActions.setSelectedAppIndex(1))
  }

  const downloadRelationships = async () => {
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
        const column_names = ['asset_num', 'related_asset_num', 'relation_type']

        await downloadRelationshipsService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'relationships.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Relationships downloaded successfully.`,
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
    setSelectedRow,
    downloadRelationships,
    setSearch,
    searchDebounce,
  }
}

export default useRelationshipsList
