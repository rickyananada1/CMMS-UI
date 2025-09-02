import { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { locationsActions } from '../../../slices/locationsSlices'
import { useSelector, useDispatch } from 'react-redux'
import { useGetDetailLocation, useSetLocationParent } from '../services'
import { useLocation as useLocationRouter } from 'react-router-dom'
import { useDebounce } from 'src/hooks/useDebounce'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDownloadLocationChildren } from '../services/downloadLocationChildren'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'
import { useGetFileUploaded } from 'src/views/pages/upload-file/services/getFileUploaded'

const useDetailLocation = ({
  mode,
  setTabIndex,
  isRefetchDetailLocation,
  setIsRefetchDetailLocation,
  isRefetchChildLocation,
  setIsRefetchChildLocation,
}) => {
  const dispatch = useDispatch()
  const location = useLocationRouter()
  const tableRef = useRef()
  const tableChildrenRef = useRef()
  const Notification = withReactContent(Swal)

  const selectedRow = useSelector((state) => state.locations?.selectedLocation)

  const [data, setData] = useState({})
  const [dataFile, setDataFile] = useState([])
  const [parentData, setParentData] = useState([])
  const [search, setSearch] = useState('')
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const searchDebounce = useDebounce(search, 400)

  const setLocationParentService = useSetLocationParent({ id: selectedRow?.location_id })

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const setSelectedRow = (param) => {
    dispatch(locationsActions.setSelectedLocation(param))
  }

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    setSelectedFile(null)
  }

  const getLocationDetail = useGetDetailLocation({
    id: selectedRow?.location_id,
    config: {
      enabled: false,
    },
  })

  const getDetailFile = useGetFileUploaded({
    url: `/location/${selectedRow?.location_id}/attachment`,
    config: {
      enabled: false,
    },
  })

  const { handleDownload } = useFileUpload({
    fieldName: 'files',
    uploadUrl: '',
    fetchUrl: `/location/${selectedRow?.location_id}/attachment`,
    mode,
  })

  useEffect(() => {
    if (mode !== 'Create') {
      getDetailFile.refetch()
      getLocationDetail.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode === 'Create') return

    const dataLocation = getLocationDetail.data?.data?.data

    setData(dataLocation)

    if (dataLocation?.parent_id) {
      setParentData([
        {
          location_id: dataLocation?.parent_id,
          location: dataLocation?.parent_location,
          location_description: dataLocation?.parent_location_description,
        },
      ])
    } else {
      setParentData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLocationDetail.data, mode])

  useEffect(() => {
    if (mode === 'Create') return
    setDataFile(getDetailFile.data?.data?.data)
  }, [getDetailFile.data, mode])

  const handleDeleteParent = async () => {
    Notification.fire({
      icon: 'warning',
      text: 'Are you sure to delete ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await setLocationParentService
          .mutateAsync({
            id: selectedRow?.location_id,
            data: {
              parent_id: null,
              location_id: selectedRow?.location_id,
              update_type: 'delete-parent',
            },
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: 'Delete Parent Location successfully.',
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
            getLocationDetail.refetch()
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

  const handleDeleteChild = async (selectedChildren) => {
    Notification.fire({
      icon: 'warning',
      text: 'Are you sure to delete ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await setLocationParentService
          .mutateAsync({
            id: selectedChildren?.location_id,
            data: {
              parent_id: null,
              location_id: selectedChildren?.location_id,
              update_type: 'delete-child',
            },
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: 'Delete Child Location successfully.',
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
            tableChildrenRef.current?.update()
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

  const downloadLocationChildrenService = useDownloadLocationChildren({
    id: selectedRow?.location_id,
  })

  const downloadLocationChildren = async () => {
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
          'location',
          'location_description',
          'location_type',
          'location_status',
          'site',
          'site_description',
        ]

        await downloadLocationChildrenService
          .mutateAsync({
            id: selectedRow?.location_id,
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'location-children.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Location Children downloaded successfully.`,
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
    if (isRefetchDetailLocation) {
      getLocationDetail.refetch()
      setIsRefetchDetailLocation(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetchDetailLocation])

  useEffect(() => {
    if (isRefetchChildLocation) {
      tableChildrenRef.current?.update()
      setIsRefetchChildLocation(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetchChildLocation])

  const errorMessage = getLocationDetail.error
  const isLoading =
    getLocationDetail.isFetching ||
    getDetailFile.isLoading ||
    getLocationDetail.isLoading ||
    getDetailFile.isLoading

  return {
    tableRef,
    tableChildrenRef,
    data,
    dataFile,
    parentData,
    isLoading,
    errorMessage,
    selectedRow,
    setSelectedRow,
    handleDownload,
    handleDeleteParent,
    handleDeleteChild,
    searchDebounce,
    handleSearch,
    downloadLocationChildren,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  }
}

export default useDetailLocation
