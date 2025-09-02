import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { securityGroupActions } from '../../../slices/securityGroupSlices'
import { useDebounce } from 'src/hooks/useDebounce'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDownloadSecurityGroups } from '../services'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useLists = () => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.securityGroup?.selectedGroup)

  const downloadSecurityGroupsService = useDownloadSecurityGroups({})

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const setSelectedRow = (param) => {
    dispatch(securityGroupActions.setSelectedGroup(param))
    dispatch(securityGroupActions.setSelectedAppIndex(1))
  }

  const downloadSecurityGroups = async () => {
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
          'security_group_code',
          'security_group_description',
          'independent_group',
          'authorized_all_sites',
        ]

        await downloadSecurityGroupsService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'security_groups.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Security Groups downloaded successfully.`,
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
    downloadSecurityGroups,
  }
}

export default useLists
