import { useEffect, useState, useRef } from 'react'
import { useDebounce } from 'src/hooks/useDebounce'
import { useOrganizationAddressesList } from '../services/getAddresses'
import { useDeleteOrganizationAddresses, useDownloadAddressesList } from '../services/addresses'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector, useDispatch } from 'react-redux'
import { organizationActions } from '../slices/organizationSlices'
import { downloadFileContentDisposition } from 'src/utils/helper'
import useFileUpload from '../../upload-file/hooks/useFileUpload'
import { useGetFileUploaded } from '../../upload-file/services/getFileUploaded'
import { useLocation } from 'react-router-dom'

const useListAddresess = (setAction, setTabIndex, mode) => {
  const tableRef = useRef()
  const dispatch = useDispatch()
  const location = useLocation()
  const Notification = withReactContent(Swal)

  const [errorMessage, setErrorMessage] = useState('')
  const [page, setPage] = useState(1)
  const [formValue, setFormValue] = useState({
    address_id: [],
  })
  const [dataFile, setDataFile] = useState([])
  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const selectedOrganization = useSelector((state) => state.organization?.selectedGroup)
  const selectedAddress = useSelector((state) => state.organization?.selectedAddress)

  const setSelectedAddress = (param) => {
    dispatch(organizationActions.setSelectedAddress(param))
  }

  const handleChangeSiteIds = (selectedValues) => {
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      address_id: selectedValues,
    }))
  }

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    setSelectedFile(null)
  }

  const siteList = useOrganizationAddressesList({
    id: selectedOrganization?.organization_id,
  })

  useEffect(() => {
    mode === 'DeleteAddress' &&
      handleDelete({ id: selectedAddress?.address_id, org_id: selectedOrganization?.id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  const loading = siteList.isPending
  const deleteAddresses = useDeleteOrganizationAddresses()

  const handleDelete = (params) => {
    Notification.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Do you want to delete ${selectedAddress?.address_code}?`,
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteAddresses
          .mutateAsync({
            params: params,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: `${selectedAddress.address_code} deleted successfully`,
            }).then(() => {
              tableRef.current?.update()
              setTabIndex(2)
              setAction('Read')
            })
          })
          .catch((err) => {
            setErrorMessage(err?.response?.data?.message)
            Notification.fire({
              icon: 'error',
              title: 'error!',
              text: err?.response?.data?.message,
            }).then(() => {
              // setTabIndex(2)
            })
          })
      } else {
        setTabIndex(2)
        setAction('Read')
      }
    })
  }

  const downloadAddressesListService = useDownloadAddressesList({
    id: selectedOrganization?.organization_id,
  })

  const downloadAddressesList = async () => {
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
        const column_names = ['address_code', 'address', 'city_name', 'province_name']

        await downloadAddressesListService
          .mutateAsync({
            id: selectedOrganization?.organization_id,
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'organization_addresses.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Organization Addresses downloaded successfully.`,
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

  const getDetailFile = useGetFileUploaded({
    url: `/administration/organizations/${selectedOrganization?.organization_id}/addresses/${selectedAddress?.address_id}/attachments`,
    config: {
      enabled: false,
    },
  })

  const { handleDownload: downloadFile } = useFileUpload({
    fieldName: 'files',
    uploadUrl: '',
    fetchUrl: `/administration/organizations/${selectedOrganization?.organization_id}/addresses/${selectedAddress?.address_id}/attachments`,
    mode,
  })

  useEffect(() => {
    if (mode !== 'UpdateAddress') {
      getDetailFile.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode === 'Create') return
    setDataFile(getDetailFile.data?.data?.data)
  }, [getDetailFile.data, mode])

  return {
    page,
    loading,
    setPage,
    siteList,
    formValue,
    setSearch,
    errorMessage,
    handleDelete,
    handleChangeSiteIds,
    selectedOrganization,
    searchDebounce,
    tableRef,
    selectedAddress,
    setSelectedAddress,
    downloadAddressesList,
    dataFile,
    downloadFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  }
}

export default useListAddresess
