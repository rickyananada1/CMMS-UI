import { useEffect, useMemo, useState } from 'react'
import {
  useCreateMeter,
  useUpdateMeter,
  useGetDomains,
  useGetReadingTypes,
  useGetUoms,
  useGetDetailMeter,
} from '../services'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'
import { useGetFileUploaded } from 'src/views/pages/upload-file/services/getFileUploaded'

const useMeters = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)
  const selectedRow = useSelector((state) => state.meters?.selectedMeter)

  const [data, setData] = useState({})
  const [dataFile, setDataFile] = useState([])
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    setSelectedFile(null)
  }

  const getMeterService = useGetDetailMeter({
    id: selectedRow?.meter_id,
    config: {
      enabled: false,
    },
  })

  const getDetailFile = useGetFileUploaded({
    url: `/meters/${selectedRow?.meter_id}/attachment`,
    config: {
      enabled: false,
    },
  })

  const { handleDownload: downloadFile } = useFileUpload({
    fieldName: 'files',
    uploadUrl: '',
    fetchUrl: `/meters/${selectedRow?.meter_id}/attachment`,
    mode,
  })

  const location = useLocation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formValue, setFormValue] = useState({
    meter_name: '',
    meter_description: '',
    meter_type: '',
    meter_reading_type_id: '',
    meter_domain_id: '',
    uom_id: '',
  })

  useEffect(() => {
    if (mode !== 'Create') {
      getMeterService.refetch()
      getDetailFile.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  const getDomainsService = useGetDomains()
  const getReadingTypesService = useGetReadingTypes()
  const getUomsService = useGetUoms()

  const fieldName = 'files'
  const { uploadUrl, fetchUrl } = useMemo(() => {
    if (mode === 'Update' && selectedRow?.meter_id) {
      const meterId = selectedRow.meter_id
      return {
        uploadUrl: `/meters/${meterId}/attachment`,
        fetchUrl: `/meters/${meterId}/attachment`,
      }
    }
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

  useEffect(() => {
    if (mode === 'Create') return
    setDataFile(getDetailFile.data?.data?.data)
  }, [getDetailFile.data, mode])

  useEffect(() => {
    if (mode === 'Create') return
    if (!getMeterService.data?.data?.data) return

    const data = getMeterService.data.data.data

    setData(data)
    setFormValue((prev) => ({
      ...prev,
      ...data,
      ...(data?.meter_reading_type_id !== null && {
        meter_reading_type_id: {
          value: data?.meter_reading_type_id,
          label: data?.meter_reading_type_value,
          description: data?.meter_reading_type_description,
        },
      }),
      ...(data?.meter_domain_id !== null && {
        meter_domain_id: {
          value: data?.meter_domain_id,
          label: data?.domain,
          description: data?.domain_description,
        },
      }),
      uom_id: {
        value: data?.uom_id,
        label: data?.uom_name,
        description: data?.uom_description,
      },
      meter_type: meter_type_options.find((val) => val?.value === data?.meter_type),
    }))
  }, [getMeterService.data, mode])

  const createMeter = useCreateMeter()
  const updateMeter = useUpdateMeter()

  const handleSubmit = async (values, formikHelpers) => {
    Notification.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Do you want to submit?`,
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const modifiedFormData = {
          meter_name: values?.meter_name,
          meter_description: values?.meter_description,
          ...(mode !== 'Create' && { meter_id: selectedRow?.meter_id }),
          ...(values?.meter_domain_id !== undefined && {
            meter_domain_id: values?.meter_domain_id?.value,
          }),
          ...(values?.meter_reading_type_id !== undefined && {
            meter_reading_type_id: values?.meter_reading_type_id?.value,
          }),
          uom_id: values?.uom_id?.value,
          meter_type: values?.meter_type?.value,
        }

        try {
          let meterId
          let fileUploadUrl

          // First handle the main form submission
          if (mode === 'Create') {
            const response = await createMeter.mutateAsync({ data: modifiedFormData })
            meterId = response?.data?.data?.meter_id

            if (!meterId) {
              throw new Error('Meter ID not returned')
            }
            fileUploadUrl = `/meters/${meterId}/attachment`
          } else {
            const updateRes = await updateMeter.mutateAsync({
              id: selectedRow?.meter_id,
              data: modifiedFormData,
            })
            meterId = selectedRow?.meter_id
            fileUploadUrl = uploadUrl

            if (!updateRes || !meterId) {
              throw new Error('Update failed or missing ID')
            }
          }

          // Handle file operations
          if (mode === 'Update' && deletedFiles?.length > 0) {
            await deletePendingFiles()
          }

          // Upload files with the correct URL
          if (files?.length > 0 && meterId) {
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
            text: 'Meter saved successfully',
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

  const isLoading = getMeterService.isFetching || getMeterService.isLoading

  return {
    data,
    isLoading,
    errorMessage,
    formValue,
    selectedRow,
    handleSubmit,
    getDomainsService,
    getReadingTypesService,
    getUomsService,
    meter_type_options,
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

const meter_type_options = [
  {
    value: 'gauge',
    label: 'Gauge',
    description: 'Gauge',
  },
  {
    value: 'continuous',
    label: 'Continuous',
    description: 'Continuous',
  },
  {
    value: 'characteristic',
    label: 'Characteristic',
    description: 'Characteristic',
  },
]

export default useMeters
