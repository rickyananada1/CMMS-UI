import { useEffect, useMemo, useState } from 'react'
import { useCreateAssetsWork } from '../services'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'

const useAssetsWorkForm = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)

  const fieldName = 'files'
  const { uploadUrl, fetchUrl } = useMemo(() => {
    if (mode === 'Update' && selectedRow?.work_order_id) {
      const woId = selectedRow.work_order_id
      return {
        uploadUrl: `/work-orders/${woId}/attachment`,
        fetchUrl: `/work-orders/${woId}/attachment`,
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
    deletedFiles,
  } = useFileUpload(fileUploadProps)

  const [formDeletedFiles, setFormDeletedFiles] = useState([])

  useEffect(() => {
    setFormDeletedFiles(deletedFiles)
  }, [deletedFiles])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const optionsWorkPriority = [
    {
      label: 'Emergency',
      value: 'emergency',
    },
    {
      label: 'Urgent',
      value: 'urgent',
    },
    {
      label: 'High',
      value: 'high',
    },
    {
      label: 'Normal',
      value: 'normal',
    },
    {
      label: 'Low',
      value: 'low',
    },
  ]

  const optionsStatus = [
    {
      label: 'WAPPR',
      value: 'WAPPR',
    },
    {
      label: 'APPR',
      value: 'APPR',
    },
    {
      label: 'WSCH',
      value: 'WSCH',
    },
    {
      label: 'WMATL',
      value: 'WMATL',
    },
    {
      label: 'WPCOND',
      value: 'WPCOND',
    },
    {
      label: 'INPRG',
      value: 'INPRG',
    },
    {
      label: 'COMP',
      value: 'COMP',
    },
    {
      label: 'CLOSE',
      value: 'CLOSE',
    },
    {
      label: 'CAN',
      value: 'CAN',
    },
  ]

  const [formValue] = useState({
    work_order_code: '',
    description: '',
    work_priority: '',
    status: 'WAPPR',
    scheduled_start: '',
    scheduled_finish: '',
  })

  const createAssetsWork = useCreateAssetsWork()

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
        const payload = {
          work_order_code: values?.work_order_code,
          description: values?.description,
          work_priority: values?.work_priority,
          status: values?.status,
          status_date: `${new Date().toISOString().slice(0, 16)}:00+07:00`,
          scheduled_start: `${values?.scheduled_start}:00+07:00`,
          scheduled_finish: `${values?.scheduled_finish}:00+07:00`,
        }

        try {
          let woId
          let fileUploadUrl

          if (mode === 'Create') {
            const response = await createAssetsWork.mutateAsync({
              id: selectedRow?.asset_id,
              data: payload,
            })
            woId = response.data?.data?.work_order_id

            if (!woId) {
              throw new Error('Work ID not returned')
            }

            fileUploadUrl = `/work-orders/${woId}/attachment`
          }

          if (files?.length && woId) {
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
            text: 'Work Order saved successfully',
            customClass: { confirmButton: 'btn btn-primary hover:text-white' },
            buttonsStyling: false,
          }).then(() => {
            setTabIndex(6)
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

  return {
    formValue,
    isModalOpen,
    setIsModalOpen,
    optionsWorkPriority,
    optionsStatus,
    handleSubmit,
    fieldName,
    uploadUrl,
    fetchUrl,
    formDeletedFiles,
    uploadModalProps,
  }
}

export default useAssetsWorkForm
