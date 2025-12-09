import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  useAssetDropdown,
  useAssetWithRelationDropdown,
  useCreateRelationship,
  useDeleteRelationship,
  useGetListRelationships,
  useGetRelationship,
  useLocationDropdown,
  useUpdateRelationship,
} from '../services'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { relationshipsActions } from '../../../slices/relationshipsSlice'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'
import { useGetFileUploaded } from 'src/views/pages/upload-file/services/getFileUploaded'

const useRelationship = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)
  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.relationships?.selectedRelationship)

  const [data, setData] = useState({})
  const [dataFile, setDataFile] = useState([])
  const [files, setFiles] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isUploadSummaryModalOpen, setIsUploadSummaryModalOpen] = useState(false)
  const [uploadSummary, setUploadSummary] = useState({ successfulUploads: [], failedUploads: [] })

  const location = useLocation()

  const getRelationship = useGetRelationship()
  const getListRelationships = useGetListRelationships()
  const deleteRelationship = useDeleteRelationship()

  const getAssetDropdown = useAssetDropdown()
  const getAssetWithRelationDropdown = useAssetWithRelationDropdown()

  const getLocationDropdown = useLocationDropdown()

  const relationshipCreate = useCreateRelationship()
  const relationshipUpdate = useUpdateRelationship()

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    setSelectedFile(null)
  }

  const fieldName = 'files'
  const { uploadUrl, fetchUrl } = useMemo(() => {
    if (mode === 'Update' && selectedRow?.asset_relation_id) {
      const relationId = selectedRow.asset_relation_id
      return {
        uploadUrl: `/asset/relation/${relationId}/attachment`,
        fetchUrl: `/asset/relation/${relationId}/attachment`,
      }
    }
    // For create mode, return empty strings
    return {
      uploadUrl: '',
      fetchUrl: '',
    }
  }, [mode, selectedRow])

  const formId = useMemo(() => selectedRow?.asset_relation_id, [selectedRow])

  const {
    errorMessage: messageError,
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
    asset_id: null,
    asset_relation_id: null,
    related_asset_id: null,
    location_id: null,
    related_location_id: null,
    relation_name: '',
    relation_type: '',
  })

  const setSelectedRow = (param) => {
    dispatch(relationshipsActions.setSelectedRelationship(param))
  }

  const getDetailFile = useGetFileUploaded({
    url: `/asset/relation/${selectedRow?.asset_relation_id}/attachment`,
    config: {
      enabled: false,
    },
  })

  useEffect(() => {
    if (mode !== 'Create') {
      getDetailFile.refetch()
      getDetailRelationship()
    } else {
      setIsLoading(false)
    }

    mode === 'Delete' && handleDelete()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode === 'Create') return
    setDataFile(getDetailFile.data?.data?.data)
  }, [getDetailFile.data, mode])

  const getDetailRelationship = async (params) => {
    setIsLoading(true)
    await getRelationship
      .mutateAsync({
        id: selectedRow?.asset_relation_id,
        params: params,
      })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data)
        }
      })
      .catch((err) => {
        setErrorMessage(err)
        setTabIndex(0)
        setAction('Read')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (!getRelationship.data?.data?.data) return
    const data = getRelationship?.data?.data?.data
    setFormValue((prev) => ({
      ...prev,
      asset_id: {
        value: data.asset_id,
        label: data.asset_num,
        description: data.asset_description,
        location_id: data.location_id,
        location: data.location,
        location_description: data.location_description,
      },
      asset_relation_id: data.asset_relation_id,
      related_asset_id: {
        value: data.related_asset_id,
        label: data.related_asset_num,
        description: data.related_asset_description,
        location_id: data.related_location_id,
        location: data.related_location,
        location_description: data.related_location_description,
      },
      location_id: {
        value: data.location_id,
        label: data.location,
        location_description: data.location_description,
      },
      related_location_id: {
        value: data.related_location_id,
        label: data.related_location,
        location_description: data.related_location_description,
      },
      isAssetFirst: !data.is_location_first,
      isRelatedAssetFirst: !data.is_related_location_first,
      relation_name: data.relation_name,
      relation_type: {
        value: data.relation_type,
        label: data.relation_type,
      },
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRelationship.data])

  const handleSubmit = (values, formikHelpers) => {
    const newValues = {
      related_location_id: values.related_location_id.value,
      location_id: values.location_id.value,
      related_asset_id: values.related_asset_id.value,
      relation_name: values.relation_name,
      relation_type: values.relation_type.value,
      is_location_first: !values?.isAssetFirst,
      is_related_location_first: !values?.isRelatedAssetFirst,
    }
    mode === 'Update'
      ? (newValues.asset_relation_id = values.asset_relation_id)
      : (newValues.asset_id = values.asset_id.value)

    Notification.fire({
      icon: 'info',
      text: 'Are you sure to submit ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            let relationShipId
            let fileUploadUrl

            if (mode === 'Create') {
              const response = await relationshipCreate.mutateAsync({
                id: values?.asset_id.value,
                data: {
                  data: [newValues],
                },
              })
              relationShipId = response?.data?.data[0]?.asset_relation_id

              if (!relationShipId) {
                throw new Error('Relationship ID not returned')
              }

              fileUploadUrl = `/asset/relation/${relationShipId}/attachment`
            } else {
              const updateRes = await relationshipUpdate.mutateAsync({
                id: values?.asset_id.value,
                data: {
                  data: [newValues],
                },
              })

              relationShipId = selectedRow?.asset_relation_id
              fileUploadUrl = uploadUrl

              if (!updateRes || !relationShipId) {
                throw new Error('Update failed or missing ID')
              }
            }

            if (mode === 'Update' && deletedFiles?.length > 0) {
              await deletePendingFiles(deletedFiles)
            }

            // Upload files with the correct URL
            if (files?.length > 0 && relationShipId) {
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
              text: `Relationship "${values?.relation_name}" ${messageSuccess}`,
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
      .finally(() => {
        formikHelpers.setSubmitting(false)
      })
  }

  const handleRetryUpload = async (fileToRetry) => {
    const fileUploadUrl = `/asset/relation/${selectedRow?.asset_relation_id}/attachment`

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

  const handleDelete = async () => {
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
        await deleteRelationship
          .mutateAsync({
            id: selectedRow.asset_id,
            data: {
              asset_relation_ids: [selectedRow.asset_relation_id],
            },
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: `Relationship deleted successfully`,
            }).then(() => {
              setSelectedRow(null)
              setTabIndex(0)
              setAction('Read')
            })
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Error!',
              text: err.response.data.message,
            })
            setErrorMessage(err.response.data.message)
          })
      } else {
        setAction('Read')
      }
    })
  }

  const relationTypeOptions = [
    {
      label: 'INTERSECTS',
      value: 'INTERSECTS',
    },
    {
      label: 'BECOMES',
      value: 'BECOMES',
    },
    {
      label: 'PARALLEL',
      value: 'PARALLEL',
    },
    {
      label: 'SPLITS FROM',
      value: 'SPLITS FROM',
    },
    {
      label: 'CARRIES',
      value: 'CARRIES',
    },
  ]

  const handleOK = () => {
    setTabIndex(0)
    setAction('Read')
  }

  const isNewFiles = useMemo(() => {
    const hasNewFiles = files?.some((item) => item instanceof File)
    const hasDeletedFiles = deletedFiles?.length > 0
    return hasNewFiles || hasDeletedFiles
  }, [files, deletedFiles])

  const messageSuccess = useMemo(
    () => (isNewFiles ? '& attachment document saved successfully' : 'saved successfully'),
    [isNewFiles],
  )

  const uploadModalProps = useMemo(
    () => ({
      files: files || [],
      setFiles,
      messageError,
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
      messageError,
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

  return {
    data,
    isLoading,
    errorMessage,
    formValue,
    relationTypeOptions,
    getListRelationships,
    getAssetDropdown,
    getAssetWithRelationDropdown,
    getLocationDropdown,
    handleSubmit,
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

export default useRelationship
