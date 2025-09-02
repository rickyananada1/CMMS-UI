import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDebounce } from 'src/hooks/useDebounce'
import { useDownloadUsers } from '../services'
import { downloadFileContentDisposition } from 'src/utils/helper'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useList = () => {
  const Notification = withReactContent(Swal)

  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.securityGroup?.selectedGroup)
  const selectedAppIndex = useSelector((state) => state.securityGroup?.selectedAppIndex)

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const downloadUsersService = useDownloadUsers({
    id: selectedRow?.security_group_id,
  })

  useEffect(() => {
    tableRef?.current?.setPage(1)
  }, [selectedAppIndex])

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
        const column_names = ['username', 'person', 'display_name', 'status', 'type']

        await downloadUsersService
          .mutateAsync({
            id: selectedRow?.security_group_id,
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'security_groups_users.csv',
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
    tableRef,
    handleSearch,
    searchDebounce,
    downloadUsers,
  }
}

export default useList
