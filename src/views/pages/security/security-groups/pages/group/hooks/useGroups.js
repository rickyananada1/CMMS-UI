import { useEffect, useMemo, useState } from 'react'
import { securityGroupActions } from '../../../slices/securityGroupSlices'
import { useSelector, useDispatch } from 'react-redux'
import {
  useCreateSecurityGroup,
  useUpdateSecurityGroup,
  useDeleteSecurityGroup,
  useGetSecurityGroupDetail,
} from '../services'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'
import { useGetFileUploaded } from 'src/views/pages/upload-file/services/getFileUploaded'

const useGroups = ({ mode, setAction, setTabIndex }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const Notification = withReactContent(Swal)
  const selectedRow = useSelector((state) => state.securityGroup?.selectedGroup)
  const setSelectedRow = (param) => {
    dispatch(securityGroupActions.setSelectedGroup(param))
  }

  const [data, setData] = useState({})
  const [dataFile, setDataFile] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formValue, setFormValue] = useState({
    security_group_code: '',
    security_group_desc: '',
    independent_group: '',
    authorized_all_sites: '',
    start_center_template: '',
    start_center_template_desc: '',
  })
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    setSelectedFile(null)
  }

  const fieldName = 'files'
  const { uploadUrl, fetchUrl } = useMemo(() => {
    if (mode === 'Update' && selectedRow?.security_group_id) {
      const sgId = selectedRow.security_group_id
      return {
        uploadUrl: `/security-groups/${sgId}/attachment`,
        fetchUrl: `/security-groups/${sgId}/attachment`,
      }
    }
    // For create mode, return empty strings
    return {
      uploadUrl: '',
      fetchUrl: '',
    }
  }, [mode, selectedRow])

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

  const [formDeletedFiles, setFormDeletedFiles] = useState([])

  useEffect(() => {
    setFormDeletedFiles(deletedFiles)
  }, [deletedFiles])

  const createSecurityGroup = useCreateSecurityGroup()
  const updateSecurityGroup = useUpdateSecurityGroup()
  const getSecurityGroupService = useGetSecurityGroupDetail({
    id: selectedRow?.security_group_id,
    config: {
      enabled: false,
    },
  })

  const getDetailFile = useGetFileUploaded({
    url: `/security-groups/${selectedRow?.security_group_id}/attachment`,
    config: {
      enabled: false,
    },
  })

  const { handleDownload: downloadFile } = useFileUpload({
    fieldName: 'files',
    uploadUrl: '',
    fetchUrl: `/security-groups/${selectedRow?.security_group_id}/attachment`,
    mode,
  })

  useEffect(() => {
    if (mode !== 'Create') {
      getSecurityGroupService.refetch()
      getDetailFile.refetch()
    }
    mode === 'Delete' && deleteGroup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode === 'Create') return

    if (!getSecurityGroupService.data?.data?.data) return

    const dataSG = getSecurityGroupService.data?.data?.data

    setData(dataSG)
    setFormValue((prev) => ({
      ...prev,
      security_group_code: dataSG?.security_group_code,
      security_group_desc: dataSG?.security_group_description,
      independent_group: dataSG?.independent_group,
      authorized_all_sites: dataSG?.authorized_all_sites,
      start_center_template: dataSG?.start_center_template,
      start_center_template_desc: dataSG?.start_center_template_desc,
    }))
  }, [getSecurityGroupService.data, mode])

  useEffect(() => {
    if (mode === 'Create') return
    setDataFile(getDetailFile.data?.data?.data)
  }, [getDetailFile.data, mode])

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
        const modifiedFormData = {
          security_group_code: values?.security_group_code,
          security_group_desc: values?.security_group_desc,
          independent_group: values?.independent_group,
          authorized_all_sites: values?.authorized_all_sites,
          start_center_template: values?.start_center_template,
          start_center_template_desc: values?.start_center_template_desc,
        }

        try {
          let securityGroupId
          let fileUploadUrl

          if (mode === 'Create') {
            const response = await createSecurityGroup.mutateAsync({ data: modifiedFormData })
            securityGroupId = response?.data?.data?.security_group_id

            if (!securityGroupId) {
              throw new Error('Group ID not returned')
            }

            fileUploadUrl = `/security-groups/${securityGroupId}/attachment`
          } else {
            const updateRes = await updateSecurityGroup.mutateAsync({
              id: selectedRow?.security_group_id,
              data: modifiedFormData,
            })

            securityGroupId = selectedRow?.security_group_id
            fileUploadUrl = uploadUrl

            if (!updateRes || !securityGroupId) {
              throw new Error('Update failed or missing ID')
            }
          }

          if (mode === 'Update' && deletedFiles?.length > 0) {
            await deletePendingFiles()
          }

          if (files?.length > 0 && securityGroupId) {
            try {
              await uploadFiles(files, fileUploadUrl)
            } catch (err) {
              // Handle Nginx 413 or general upload error
              const status = err?.response?.status
              if (status === 413) {
                throw new Error('Upload failed: File size exceeds server limit (Nginx)')
              }
              throw new Error('Upload failed: ' + (err.message || 'Unknown error'))
            }
          }

          Notification.fire({
            icon: 'success',
            title: 'Success',
            text: 'Security Group saved successfully',
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
  const deleteSecurityGroup = useDeleteSecurityGroup()

  const deleteGroup = async () => {
    Notification.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Do you want to delete ${selectedRow?.security_group_code}?`,
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteSecurityGroup
          .mutateAsync({
            id: selectedRow.security_group_id,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: `${selectedRow?.security_group_code} deleted successfully`,
            }).then(() => {
              setSelectedRow(null)
              setTabIndex(0)
              setAction('Read')
            })
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Oops...!',
              text: err.response?.data?.message || 'Something went wrong!',
            })
          })
      } else {
        setAction('Read')
      }
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

  const isLoading = getSecurityGroupService.isLoading || getSecurityGroupService.isFetching

  return {
    data,
    isLoading,
    errorMessage,
    formValue,
    selectedRow,
    setSelectedRow,
    handleSubmit,
    isModalOpen,
    setIsModalOpen,
    fieldName,
    uploadUrl,
    fetchUrl,
    formDeletedFiles,
    uploadModalProps,
    dataFile,
    downloadFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  }
}

export default useGroups
