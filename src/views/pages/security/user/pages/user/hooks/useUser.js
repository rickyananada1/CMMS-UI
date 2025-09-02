import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { securityUserActions } from '../../../slices/securityUserSlices'
import { useSelector, useDispatch } from 'react-redux'
import {
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useGetSites,
  useGetDetailUser,
} from '../services'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useGetOrganizationDropdown } from 'src/views/pages/organization/services'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'
import { useGetFileUploaded } from 'src/views/pages/upload-file/services/getFileUploaded'

var type_options = [
  {
    value: 1,
    label: 'Daily User',
  },
  {
    value: 2,
    label: 'Secondary User',
  },
  {
    value: 3,
    label: 'Requester',
  },
  {
    value: 4,
    label: 'Admin',
  },
  {
    value: 5,
    label: 'Super Admin',
  },
]

const useUser = ({ mode, setAction, setTabIndex }) => {
  const selectRef = useRef()
  const location = useLocation()
  const dispatch = useDispatch()
  const Notification = withReactContent(Swal)
  const selectedRow = useSelector((state) => state.securityUser?.selectedGroup)
  const currentUser = useSelector((state) => state.auth?.user)
  const setSelectedRow = (param) => {
    dispatch(securityUserActions.setSelectedGroup(param))
  }

  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState({})
  const [dataFile, setDataFile] = useState([])
  const [dataConfirmation, setDataConfirmation] = useState({})
  const [selectOptions, setSelectOptions] = useState([])
  const [typeOptions, setTypeOptions] = useState(type_options)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formValue, setFormValue] = useState({
    supervisor: '',
    display_name: '',
    phone_number: '',
    email: '',
    site_id: null,
    type: '',
    is_active: false,
  })
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    setSelectedFile(null)
  }

  const fieldName = 'files'
  const { uploadUrl, fetchUrl } = useMemo(() => {
    if (mode === 'Update' && selectedRow?.user_id) {
      const userId = selectedRow.user_id
      return {
        uploadUrl: `/users/${userId}/attachments`,
        fetchUrl: `/users/${userId}/attachments`,
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
    errorMessage: messageError,
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

  const createUser = useCreateUser()
  const updateUser = useUpdateUser()
  const getSitesSerivce = useGetSites({ org_id: 'all' })
  const getOrganizationService = useGetOrganizationDropdown()
  const getUserService = useGetDetailUser({
    id: selectedRow?.user_id,
    config: {
      enabled: false,
    },
  })

  useEffect(() => {
    filterTypeOptions()
    if (mode !== 'Create') {
      getSites()
      getUserService.refetch()
    }
    mode === 'Delete' && deleteUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  const filterTypeOptions = () => {
    switch (currentUser?.type) {
      case 5:
        setTypeOptions(typeOptions.filter((val) => val.value === 4 || val.value === 5))
        break
      case 4:
        setTypeOptions(typeOptions.filter((val) => val.value !== 5))
        break
      default:
        setTypeOptions(typeOptions.filter((val) => val.value !== 4 && val.value !== 5))
        break
    }
  }

  const getSites = async () => {
    await getSitesSerivce
      .mutateAsync({
        params: { access: 'true', user_id: selectedRow?.user_id ?? null },
      })
      .then((res) => {
        if (res.status === 200) {
          setSelectOptions(res.data.data)
        }
      })
      .catch((err) => {
        setErrorMessage(err)
      })
      .finally(() => {})
  }

  const handleDataConfirmation = useCallback(
    (type) => {
      if (mode === 'Update' && data.type < 4 !== type.value < 4) {
        setDataConfirmation({
          icon: 'warning',
          html: (
            <>
              <span>Are you sure to change user type?</span>
              <br />
              <span>The access of the user will be reset.</span>
            </>
          ),
        })
      } else {
        setDataConfirmation({
          icon: 'info',
          text: 'Are you sure to submit ?',
        })
      }
    },
    [data, mode],
  )

  useEffect(() => {
    if (mode === 'Create') return
    if (!getUserService.data?.data?.data) return

    const data = getUserService.data.data.data

    setData(data)
    setFormValue((prev) => ({
      ...prev,
      supervisor: data?.supervisor,
      display_name: data?.display_name,
      phone_number: Number(data?.phone_number),
      email: data?.email,
      ...(data?.site_id !== null && {
        site_id: {
          value: data?.site_id,
          label: data?.site,
          site_description: data?.site_description,
        },
      }),
      type: type_options.find((val) => val.value === data?.type),
      is_active: data?.is_active,
      organization_id: {
        value: data?.organization_id,
        label: data?.organization_name,
      },
    }))
    handleDataConfirmation(type_options.find((val) => val.value === data?.type))
  }, [getUserService.data, mode, handleDataConfirmation])

  const handleSubmit = async (values, formikHelpers) => {
    Notification.fire({
      ...dataConfirmation,
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        formikHelpers.setSubmitting(true)
        const modifiedFormData = {
          ...(mode === 'Update' && { user_id: selectedRow?.user_id }),
          // supervisor: values?.supervisor,
          organization_id: values?.organization_id?.value,
          display_name: values?.display_name,
          phone_number: `${values?.phone_number}`,
          email: values?.email,
          site_id: values?.site_id?.value,
          type: values?.type?.value,
          is_active: values?.is_active ?? false,
        }

        try {
          let userId
          let fileUploadUrl

          // First handle the main form submission
          if (mode === 'Create') {
            const response = await createUser.mutateAsync({ data: modifiedFormData })
            userId = response?.data?.data?.user_id

            if (!userId) {
              throw new Error('User ID not returned')
            }

            fileUploadUrl = `/users/${userId}/attachments`
          } else {
            const updateRes = await updateUser.mutateAsync({
              id: selectedRow?.user_id,
              data: modifiedFormData,
            })

            userId = selectedRow?.user_id
            fileUploadUrl = uploadUrl // Use existing URL for update mode

            if (!updateRes || !userId) {
              throw new Error('Update Failed or missing ID')
            }
          }

          // Handle file operations
          if (mode === 'Update' && deletedFiles?.length > 0) {
            await deletePendingFiles()
          }

          // Upload files with the correct URL
          if (files?.length > 0 && userId) {
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
            text: 'User saved successfully',
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
            text:
              error?.response?.data?.message === 'resource already exists'
                ? 'Email already registered.'
                : error?.response?.data?.message || error.message || 'Something went wrong!',
          })
        } finally {
          formikHelpers.setSubmitting(false)
        }
      }
    })
  }

  const deleteUserService = useDeleteUser()

  const deleteUser = async () => {
    Notification.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Do you want to delete ${selectedRow?.username}?`,
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUserService
          .mutateAsync({
            id: selectedRow.user_id,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: `${selectedRow.username} deleted successfully`,
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

  const getDetailFile = useGetFileUploaded({
    url: `/users/${selectedRow?.user_id}/attachments`,
    config: {
      enabled: false,
    },
  })

  const { handleDownload: downloadFile } = useFileUpload({
    fieldName: 'files',
    uploadUrl: '',
    fetchUrl: `/users/${selectedRow?.user_id}/attachments`,
    mode,
  })

  useEffect(() => {
    if (mode !== 'Create') {
      getDetailFile.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode === 'Create') return
    setDataFile(getDetailFile.data?.data?.data)
  }, [getDetailFile.data, mode])

  const uploadModalProps = useMemo(
    () => ({
      files: files || [],
      messageError,
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
      messageError,
      onDrop,
      removeFiles,
      MAX_FILE_SIZE,
      acceptedFileTypes,
      handleDownload,
      mode,
    ],
  )

  const isLoading = getUserService.isFetching || getUserService.isLoading

  return {
    data,
    isLoading,
    errorMessage,
    formValue,
    selectedRow,
    setSelectedRow,
    handleSubmit,
    type_options,
    getSitesSerivce,
    getOrganizationService,
    selectRef,
    selectOptions,
    filterTypeOptions,
    typeOptions,
    currentUser,
    handleDataConfirmation,
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

export default useUser
