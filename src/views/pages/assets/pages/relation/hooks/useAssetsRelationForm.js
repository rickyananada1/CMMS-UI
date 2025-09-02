import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assetActions } from '../../../slices/assetSlices'
import {
  useAssetDropdown,
  useAssetWithRelationDropdown,
  useCreateRelation,
  useGetListRelation,
  useLocationDropdown,
  useUpdateRelation,
} from '../services'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useLocation } from 'react-router-dom'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'

const useAssetsRelationForm = (mode, setAction, setTabIndex) => {
  const dispatch = useDispatch()
  const location = useLocation()

  const Notification = withReactContent(Swal)
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)
  const selectedRowRelation = useSelector((state) => state.assets?.selectedRelation)

  const fieldName = 'files'
  const { uploadUrl, fetchUrl } = useMemo(() => {
    if (mode === 'Update' && selectedRowRelation?.asset_relation_id) {
      const relationId = selectedRowRelation.asset_relation_id
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
  }, [mode, selectedRowRelation])

  const fileUploadProps = useMemo(
    () => ({
      fieldName,
      uploadUrl,
      fetchUrl,
      mode,
    }),
    [fieldName, uploadUrl, fetchUrl, mode],
  )

  const {
    files,
    errorMessage,
    onDrop,
    removeFiles,
    MAX_FILE_SIZE,
    acceptedFileTypes,
    uploadFiles,
    handleDownload,
    deletePendingFiles,
    deletedFiles,
  } = useFileUpload(fileUploadProps)

  // Track deleted files in component state
  const [formDeletedFiles, setFormDeletedFiles] = useState([])

  // Update formDeletedFiles when deletedFiles changes
  useEffect(() => {
    setFormDeletedFiles(deletedFiles)
  }, [deletedFiles])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formValue, setFormValue] = useState({
    asset_id: selectedRow?.asset_id,
    asset_relation_id: null,
    related_asset_id: null,
    location_id: null,
    related_location_id: null,
    relation_name: '',
    relation_type: '',
  })

  const listRelationType = [
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

  const setSelectedRow = (param) => {
    dispatch(assetActions.setSelectedAsset(param))
  }

  const getAssetDropdown = useAssetDropdown()
  const getAssetWithRelationDropdown = useAssetWithRelationDropdown({ targetId: 1 })
  const getLocationDropdown = useLocationDropdown()

  const relationCreate = useCreateRelation()
  const relationUpdate = useUpdateRelation()
  const relationGet = useGetListRelation({
    id: selectedRow?.asset_id,
    config: {
      enabled: false,
    },
  })

  useEffect(() => {
    if (mode !== 'Create') {
      relationGet.refetch()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode, selectedRow?.asset_id])

  useEffect(() => {
    if (mode !== 'Create') {
      if (!relationGet?.data) return

      var data = relationGet?.data?.data?.data?.filter(
        (relation) => relation.asset_relation_id === selectedRowRelation?.asset_relation_id,
      )

      setFormValue((prev) => ({
        ...prev,
        asset_id: data[0]?.asset_id,
        asset_relation_id: data[0]?.asset_relation_id,
        related_asset_id: {
          value: data[0]?.related_asset_id,
          label: data[0]?.related_asset_num,
          description: data[0]?.related_asset_description,
          location_id: data[0]?.location_id,
          location: data[0]?.location,
          location_description: data[0]?.location_description,
        },
        location_id: data[0]?.location_id,
        related_location_id: {
          value: data[0]?.related_location_id,
          label: data[0]?.related_location,
          location_description: data[0]?.related_location_description,
        },
        isAssetFirst: !data[0]?.is_location_first,
        isRelatedAssetFirst: !data[0]?.is_related_location_first,
        relation_name: data[0]?.relation_name,
        relation_type: {
          value: data[0]?.relation_type,
          label: data[0]?.relation_type,
        },
      }))
    } else {
      setFormValue(() => ({
        asset_id: selectedRow?.asset_id,
        asset_relation_id: null,
        related_asset_id: null,
        location_id: selectedRow?.location_id,
        related_location_id: null,
        relation_name: '',
        relation_type: '',
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relationGet.data])

  const handleSubmit = (values, formikHelpers) => {
    const newObj = {
      related_location_id: values.related_location_id.value,
      location_id: selectedRow.location_id,
      related_asset_id: values.related_asset_id.value,
      relation_name: values.relation_name,
      relation_type: values.relation_type.value,
      is_location_first: !values?.isAssetFirst,
      is_related_location_first: !values?.isRelatedAssetFirst,
    }
    mode === 'Update'
      ? (newObj.asset_relation_id = values.asset_relation_id)
      : (newObj.asset_id = values.asset_id)

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
              const response = await relationCreate.mutateAsync({
                id: selectedRow?.asset_id,
                data: {
                  data: [newObj],
                },
              })
              relationShipId = response?.data?.data[0]?.asset_relation_id

              if (!relationShipId) {
                throw new Error('Asset Relation ID not returned')
              }
              fileUploadUrl = `/asset/relation/${relationShipId}/attachment`
            } else {
              const updateRes = await relationUpdate.mutateAsync({
                id: selectedRow?.asset_id,
                data: {
                  data: [newObj],
                },
              })
              relationShipId = selectedRowRelation?.asset_relation_id
              fileUploadUrl = uploadUrl

              if (!updateRes || !relationShipId) {
                throw new Error('Update failed or missing ID')
              }
            }

            if (mode === 'Update' && deletedFiles?.length > 0) {
              await deletePendingFiles()
            }

            // Upload files with the correct URL
            if (files?.length > 0 && relationShipId) {
              try {
                await uploadFiles(files, fileUploadUrl)
              } catch (err) {
                // Handle Nginx 413 or general upload error
                const status = err?.response?.status
                if (status === 413) {
                  throw new Error('Upload failed: File size exceeds server limit (Nginx)')
                }
                if (status !== 202) {
                  throw new Error('Upload failed: ' + (err.message || 'Unknown error'))
                }
              }
            }

            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: 'Relationship saved successfully',
              customClass: { confirmButton: 'btn btn-primary hover:text-white' },
              buttonsStyling: false,
            }).then(() => {
              setTabIndex(5)
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

  const uploadModalProps = useMemo(
    () => ({
      files: files || [],
      errorMessage,
      onDrop,
      mode,
      removeFiles,
      MAX_FILE_SIZE,
      acceptedFileTypes,
      handleDownload,
      isSubmitting: false,
      isError: false,
    }),
    [
      files,
      errorMessage,
      onDrop,
      removeFiles,
      MAX_FILE_SIZE,
      acceptedFileTypes,
      handleDownload,
      mode,
    ],
  )

  const isLoading = relationGet.isRefetching

  return {
    isLoading,
    selectedRow,
    setSelectedRow,
    handleSubmit,
    Notification,
    formValue,
    setFormValue,
    getLocationDropdown,
    getAssetDropdown,
    listRelationType,
    getAssetWithRelationDropdown,
    isModalOpen,
    setIsModalOpen,
    fieldName,
    uploadUrl,
    fetchUrl,
    formDeletedFiles,
    uploadModalProps,
  }
}

export default useAssetsRelationForm
