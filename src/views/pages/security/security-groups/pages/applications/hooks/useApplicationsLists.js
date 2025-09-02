import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { securityGroupActions } from '../../../slices/securityGroupSlices'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDownloadSecurityGroupsApplications } from '../services'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDebounce } from 'src/hooks/useDebounce'

const useApplicationsList = ({ visible, setVisible, setAction }) => {
  const tableRef = useRef()
  const dispatch = useDispatch()
  const Notification = withReactContent(Swal)

  const selectedRow = useSelector((state) => state.securityGroup?.selectedGroup)

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const setSelectedRow = (param) => {
    dispatch(securityGroupActions.setSelectedGroup(param))
  }

  const [isLoading, setIsLoading] = useState(false)

  const downloadApplicationsService = useDownloadSecurityGroupsApplications({
    id: selectedRow?.security_group_id,
  })

  const downloadSecurityGroupsApplications = async () => {
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
        const column_names = ['application_name', 'create', 'read', 'update', 'delete']

        await downloadApplicationsService
          .mutateAsync({
            id: selectedRow?.security_group_id,
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'security_groups_applications.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Security Groups Applications downloaded successfully.`,
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
    isLoading,
    setIsLoading,
    selectedRow,
    setSelectedRow,
    downloadSecurityGroupsApplications,
    setSearch,
    handleSearch,
    searchDebounce,
  }
}

export default useApplicationsList
