import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDebounce } from 'src/hooks/useDebounce'
import { organizationActions } from '../slices/organizationSlices'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useLocation } from 'react-router-dom'
import { useServiceOrganizationDelete, useDownload } from '../services/organizations'
import { downloadFileContentDisposition } from 'src/utils/helper'

const useOrganizationList = (mode, setAction, setTabIndex) => {
  const dispatch = useDispatch()
  const [detailData] = useState(null)
  const [search, setSearch] = useState('')
  const tableRef = useRef()
  const searchDebounce = useDebounce(search, 400)
  const selectedRow = useSelector((state) => state.organization?.selectedGroup)
  const Notification = withReactContent(Swal)
  const location = useLocation()
  // const navigate = useNavigate()
  const downloadService = useDownload({})

  const setSelectedRow = (param) => {
    dispatch(organizationActions.setSelectedGroup(param))
    dispatch(organizationActions.setSelectedAppIndex(1))
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    mode === 'Delete' && deleteAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname, mode])

  const serviceOrganizationDelete = useServiceOrganizationDelete()
  const deleteAction = async () => {
    Notification.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Do you want to delete ${selectedRow?.organization_name}?`,
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await serviceOrganizationDelete
          .mutateAsync({
            params: {
              id: selectedRow?.organization_id,
            },
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: `${selectedRow?.organization_name} deleted successfully`,
            }).then(() => {
              setSelectedRow(null)
              setSearch(' ')
              setTabIndex(0)
              setAction('Read')
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
            setAction('Read')
          })
      } else {
        setAction('Read')
        //setAction('Read')
      }
    })
  }

  const download = async () => {
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
        const column_names = ['organization_name', 'organization_description']

        await downloadService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'organization.csv',
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
    detailData,
    tableRef,
    searchDebounce,
    setSelectedRow,
    selectedRow,
    handleSearch,
    deleteAction,
    download,
  }
}

export default useOrganizationList
