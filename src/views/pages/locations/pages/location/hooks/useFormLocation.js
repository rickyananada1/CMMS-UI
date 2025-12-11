import { useRef, useState, useEffect, useMemo } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useLocation as useLocationRouter } from 'react-router-dom'
import {
  useCreateLocation as useCreateLocationServices,
  useUpdateLocation as useUpdateLocationServices,
  useGetAllSiteOrganizations,
  useGetRotatingItem,
  useGetFailureClass,
  useGetHazard,
  useGetMeterGroup,
  useGetDetailLocation,
} from '../services'
import { useSelector, useDispatch } from 'react-redux'
import { locationsActions } from '../../../slices/locationsSlices'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'
import { useGetFileUploaded } from 'src/views/pages/upload-file/services/getFileUploaded'

const useFormLocation = ({ mode, setAction, setTabIndex }) => {
  const dispatch = useDispatch()
  const location = useLocationRouter()
  const selectedRow = useSelector((state) => state.locations?.selectedLocation)
  const userSite = {
    site_id: useSelector((state) => state.auth?.user?.site_id),
    site: useSelector((state) => state.auth?.user?.site),
  }

  const [selectedFile, setSelectedFile] = useState(null)
  const [dataFile, setDataFile] = useState([])
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [isUploadSummaryModalOpen, setIsUploadSummaryModalOpen] = useState(false)
  const [uploadSummary, setUploadSummary] = useState({ successfulUploads: [], failedUploads: [] })

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    setSelectedFile(null)
  }

  const Notification = withReactContent(Swal)
  const tableRef = useRef()
  const tableChildrenRef = useRef()

  const fieldName = 'files'
  const { uploadUrl, fetchUrl } = useMemo(() => {
    if (mode === 'Update' && selectedRow?.location_id) {
      const locationId = selectedRow.location_id
      return {
        uploadUrl: `/location/${locationId}/attachment`,
        fetchUrl: `/location/${locationId}/attachment`,
      }
    }
    return {
      uploadUrl: '',
      fetchUrl: '',
    }
  }, [mode, selectedRow])

  const [files, setFiles] = useState([])

  const formId = useMemo(() => selectedRow?.location_id, [selectedRow])

  const {
    errorMessage,
    MAX_FILE_SIZE,
    acceptedFileTypes,
    uploadFiles,
    handleDownload,
    deletePendingFiles,
    deletedFiles,
    setDeletedFiles,
    tempFiles,
    setTempFiles,
    isModalOpen,
    setIsModalOpen,
    handleModalClose,
    handleFileSelect,
    duplicateFileError,
  } = useFileUpload({ uploadUrl, fetchUrl, mode, files, setFiles, formId })

  const [formDeletedFiles, setFormDeletedFiles] = useState([])

  useEffect(() => {
    setFormDeletedFiles(deletedFiles)
  }, [deletedFiles])

  const [formValue, setFormValue] = useState({
    location: {
      site_id:
        userSite?.site_id !== null
          ? {
              value: userSite?.site_id,
              label: userSite?.site,
            }
          : '',
      location: '',
      location_description: '',
      location_type: '',
      location_status: '',
      location_special_date: '',
      location_attachment_url: '',
      location_priority: null,
      location_shift: null,
      meter_group: {
        label: '',
        value: '',
        description: '',
      },
      failure_class: {
        label: '',
        value: '',
      },
      location_gl_account: '',
      location_labor: '',
      location_address: '',
      location_bill_to: '',
      location_ship_to: '',
      hazard_group: '',
      hazard_group_description: '',
      rotating_item: null,
      rotating_item_description: null,
    },
    location_associates_parent: [],
    location_associates_children: [],
  })

  const optionsType = [
    { label: 'Operating', value: 'operating' },
    { label: 'Vendor', value: 'vendor' },
    { label: 'Salvage', value: 'salvage' },
    { label: 'Labor', value: 'labor' },
    { label: 'Courier', value: 'courier' },
    { label: 'Holding', value: 'holding' },
    { label: 'Storeroom', value: 'storeroom' },
  ]

  const optionsStatus = [
    { label: 'Planned', value: 'planned' },
    { label: 'Operating', value: 'operating' },
    { label: 'Decommissioned', value: 'decommissioned' },
  ]

  const setSelectedRow = (param) => {
    dispatch(locationsActions.setSelectedLocation(param))
  }

  const updateLocationService = useUpdateLocationServices()
  const createLocationService = useCreateLocationServices()
  const getAllSiteOrganizationsService = useGetAllSiteOrganizations()
  const getRotatingItemService = useGetRotatingItem()
  const getFailureClassService = useGetFailureClass()
  const getHazardService = useGetHazard()
  const getMeterGroupService = useGetMeterGroup()
  const getLocationService = useGetDetailLocation({
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

  useEffect(() => {
    if (mode !== 'Create') {
      getLocationService.refetch()
      getDetailFile.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode === 'Create') return
    setDataFile(getDetailFile.data?.data?.data)
  }, [getDetailFile.data, mode])

  useEffect(() => {
    if (mode === 'Create') return

    const dataLocation = getLocationService?.data?.data?.data
    setFormValue((prev) => ({
      location: {
        ...prev,
        location: dataLocation?.location,
        location_description: dataLocation?.location_description,
        location_type: dataLocation?.location_type,
        location_priority: dataLocation?.location_priority,
        location_special_date: dataLocation?.location_special_date,
        location_status: dataLocation?.location_status,
        location_attachment_url: dataLocation?.location_attachment_url,
        site_id: {
          label: dataLocation?.site,
          value: dataLocation?.site_id,
        },
        location_shift: dataLocation?.shift,
        meter_group: {
          label: dataLocation?.meter_group || '',
          value: dataLocation?.meter_group_id || '',
          description: dataLocation?.meter_group_description || '',
        },
        failure_class: {
          label: dataLocation?.failure_class || '',
          value: dataLocation?.failure_class || '',
        },
        location_gl_account: dataLocation?.gl_account,
        location_labor: dataLocation?.labor,
        location_address: dataLocation?.address,
        location_bill_to: dataLocation?.bill_to,
        location_ship_to: dataLocation?.ship_to,
        hazard_group: dataLocation?.hazard_group,
        hazard_group_description: dataLocation?.hazard_group_description,
        rotating_item: dataLocation?.rotating_item,
        rotating_item_description: dataLocation?.rotating_item_description,
        location_associates_parent: [],
        location_associates_children: [],
      },
    }))
  }, [getLocationService.data, mode])

  const handleSelectedLocationParent = (location) => {
    setFormValue((prevValue) => {
      const isLocationIncluded = prevValue.location_associates_parent.some(
        (item) => item?.location_id === location?.location_id,
      )

      const updatedAssociates = isLocationIncluded
        ? prevValue.location_associates_parent.filter(
            (item) => item?.location_id !== location?.location_id,
          )
        : [...prevValue.location_associates_parent, location]

      return {
        ...prevValue,
        location_associates_parent: updatedAssociates,
      }
    })
  }

  const handleSelectedLocationChildren = (location) => {
    setFormValue((prevValue) => {
      const isLocationIncluded = prevValue.location_associates_children.some(
        (item) => item?.location_id === location?.location_id,
      )

      const updatedAssociates = isLocationIncluded
        ? prevValue.location_associates_children.filter(
            (item) => item?.location_id !== location?.location_id,
          )
        : [...prevValue.location_associates_children, location]

      return {
        ...prevValue,
        location_associates_children: updatedAssociates,
      }
    })
  }

  const handleSubmit = async (values, formikHelpers) => {
    Notification.fire({
      icon: 'info',
      text: 'Are you sure to submit ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let locationId
          let fileUploadUrl

          if (mode === 'Create') {
            let payload = {
              location: {
                location: values?.location?.location,
                location_description: values?.location?.location_description,
                location_status: values?.location?.location_status,
                location_type: values?.location?.location_type,
                location_special_date: values?.location?.location_special_date || null,
                location_priority: values?.location?.location_priority
                  ? +values?.location?.location_priority
                  : 0,
                site_id: +values?.location?.site_id?.value,
                location_shift: values?.location?.location_shift,
                meter_group_id: values?.location?.meter_group?.value || null,
                meter_group_description: values?.location?.meter_group?.description,
                failure_class: values?.location?.failure_class?.value,
                location_gl_account: values?.location?.location_gl_account,
                location_labor: values?.location?.location_labor,
                location_address: values?.location.location_address,
                location_bill_to: values?.location?.location_bill_to,
                location_ship_to: values?.location?.location_ship_to,
                hazard_group: values?.location?.hazard_group,
                hazard_group_description: values?.location?.hazard_group_description,
                rotating_item: values?.location?.rotating_item,
                rotating_item_description: values?.location?.rotating_item_description,
              },
            }

            const location_associates = []

            if (
              Array.isArray(values?.location_associates_parent) &&
              values?.location_associates_parent.length
            ) {
              values?.location_associates_parent.forEach((item) => {
                if (item?.location_id) {
                  location_associates.push({
                    location_associate_location_id: +item?.location_id,
                    location_associate_type: 'parent',
                  })
                }
              })
            }

            if (
              Array.isArray(values?.location_associates_children) &&
              values?.location_associates_children.length
            ) {
              values?.location_associates_parent.forEach((item) => {
                if (item?.location_id) {
                  location_associates.push({
                    location_associate_location_id: +item?.location_id,
                    location_associate_type: 'child',
                  })
                }
              })
            }

            payload.location_associates = location_associates

            const response = await createLocationService.mutateAsync({ data: payload })
            locationId = response?.data?.data?.location_id

            if (!locationId) {
              throw new Error('Location ID not returned')
            }
            fileUploadUrl = `/location/${locationId}/attachment`
          } else {
            let payload = {
              location: {
                location: values?.location?.location,
                location_attachment_url: values?.location?.location_attachment_url,
                location_description: values?.location?.location_description,
                location_special_date: values?.location?.location_special_date,
                location_status: values?.location?.location_status,
                location_type: values?.location?.location_type,
                location_priority: +values?.location?.location_priority,
                site_id: +values?.location?.site_id?.value,
                location_shift: values?.location?.location_shift,
                meter_group_id: values?.location?.meter_group?.value || null,
                meter_group_description: values?.location?.meter_group?.description,
                failure_class: values?.location?.failure_class?.value,
                location_gl_account: values?.location?.location_gl_account,
                location_labor: values?.location?.location_labor,
                location_address: values?.location.location_address,
                location_bill_to: values?.location?.location_bill_to,
                location_ship_to: values?.location?.location_ship_to,
                hazard_group: values?.location?.hazard_group,
                hazard_group_description: values?.location?.hazard_group_description,
                rotating_item: values?.location?.rotating_item,
                rotating_item_description: values?.location?.rotating_item_description,
              },
            }

            if (Array.isArray(values?.location_associates) && values?.location_associates.length) {
              payload.location_associates = values?.location_associates
            }

            const updateRes = await updateLocationService.mutateAsync({
              id: selectedRow?.location_id,
              data: payload,
            })

            locationId = selectedRow?.location_id
            fileUploadUrl = uploadUrl

            if (!updateRes || !locationId) {
              throw new Error('Update failed or missing ID')
            }
          }

          if (mode === 'Update' && deletedFiles?.length > 0) {
            await deletePendingFiles(deletedFiles)
          }

          if (files?.length > 0 && locationId) {
            const uploadResult = await uploadFiles(files, fileUploadUrl)
            setUploadSummary(uploadResult)

            if (uploadResult.failedUploads.length > 0) {
              setIsUploadSummaryModalOpen(true)
              return
            }
          }

          Notification.fire({
            icon: 'success',
            title: 'Success',
            text: `Location "${values?.location?.location}" ${messageSuccess}`,
            customClass: { confirmButton: 'btn btn-primary hover:text-white' },
            buttonsStyling: false,
          }).then(() => {
            setTabIndex(0)
            setAction('Read')
          })
        } catch (error) {
          Notification.fire({
            icon: 'error',
            title: 'Oops...!',
            text: error.response?.data?.message || error.message || 'Something went wrong!',
          })
        } finally {
          formikHelpers.setSubmitting(false)
        }
      }
    })
  }

  const handleRetryUpload = async (fileToRetry) => {
    const fileUploadUrl = `/location/${selectedRow?.location_id}/attachment`

    setUploadSummary((prevSummary) => ({
      ...prevSummary,
      failedUploads: prevSummary.failedUploads.filter((item) => item.file !== fileToRetry),
    }))

    const result = await uploadFiles([fileToRetry], fileUploadUrl, formId)

    setUploadSummary((prevSummary) => ({
      successfulUploads: [...prevSummary.successfulUploads, ...result.successfulUploads],
      failedUploads: [...prevSummary.failedUploads, ...result.failedUploads],
    }))
  }

  const handleOK = () => {
    setTabIndex(0)
    setAction('Read')
  }

  const uploadModalProps = useMemo(
    () => ({
      files: files || [],
      setFiles,
      errorMessage,
      mode,
      MAX_FILE_SIZE,
      acceptedFileTypes,
      handleDownload,
      uploadFiles,
      deletedFiles,
      setDeletedFiles,
      tempFiles,
      setTempFiles,
      isModalOpen,
      setIsModalOpen,
      handleModalClose,
      handleFileSelect,
      duplicateFileError,
      isSubmitting: false,
      isError: false,
    }),
    [
      files,
      setFiles,
      errorMessage,
      MAX_FILE_SIZE,
      acceptedFileTypes,
      handleDownload,
      mode,
      uploadFiles,
      deletedFiles,
      setDeletedFiles,
      tempFiles,
      setTempFiles,
      isModalOpen,
      setIsModalOpen,
      handleModalClose,
      handleFileSelect,
      duplicateFileError,
    ],
  )

  const isNewFiles = useMemo(() => {
    const hasNewFiles = files?.some((item) => item instanceof File)
    const hasDeletedFiles = deletedFiles?.length > 0
    return hasNewFiles || hasDeletedFiles
  }, [files, deletedFiles])

  const messageSuccess = useMemo(
    () => (isNewFiles ? '& attachment document saved successfully' : 'saved successfully'),
    [isNewFiles],
  )

  return {
    userSite,
    tableRef,
    tableChildrenRef,
    formValue,
    selectedRow,
    optionsType,
    optionsStatus,
    getAllSiteOrganizationsService,
    getRotatingItemService,
    getFailureClassService,
    getHazardService,
    getMeterGroupService,
    handleSubmit,
    setSelectedRow,
    handleSelectedLocationParent,
    handleSelectedLocationChildren,
    handleDownload,
    isModalOpen,
    setIsModalOpen,
    fieldName,
    uploadUrl,
    fetchUrl,
    formDeletedFiles,
    uploadModalProps,
    dataFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
    uploadFiles,
    files,
    isUploadSummaryModalOpen,
    setIsUploadSummaryModalOpen,
    uploadSummary,
    handleRetryUpload,
    handleOK,
    isNewFiles,
  }
}

export default useFormLocation
