import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { securityUserActions } from '../../../slices/securityUserSlices'
import { useDebounce } from 'src/hooks/useDebounce'
import { useDownloadUsers } from '../services/downloadUsers'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'

const useList = () => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.securityUser?.selectedGroup)

  const downloadUsersService = useDownloadUsers({})

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const setSelectedRow = (param) => {
    dispatch(securityUserActions.setSelectedGroup(param))
    dispatch(securityUserActions.setSelectedAppIndex(1))
  }

  const downloadUsers = async () => {
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
        const column_names = ['username', 'email', 'display_name', 'is_active', 'type']

        await downloadUsersService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'users.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Users downloaded successfully.`,
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
    downloadUsers,
  }
}

export default useList
