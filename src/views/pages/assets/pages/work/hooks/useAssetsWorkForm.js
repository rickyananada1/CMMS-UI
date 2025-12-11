import { useMemo, useState } from 'react'
import { useCreateAssetsWork } from '../services'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'

const useAssetsWorkForm = ({ setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)

  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [workOrderId, setWorkOrderId] = useState(null)
  const [isUploadSummaryModalOpen, setIsUploadSummaryModalOpen] = useState(false)
  const [uploadSummary, setUploadSummary] = useState({ successfulUploads: [], failedUploads: [] })

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    setSelectedFile(null)
  }

  const fieldName = 'files'
  const { uploadUrl, fetchUrl } = useMemo(() => {
    return {
      uploadUrl: '',
      fetchUrl: '',
    }
  }, [])

  const [files, setFiles] = useState([])

  const formId = useMemo(() => '', [])

  const {
    errorMessage,
    MAX_FILE_SIZE,
    acceptedFileTypes,
    uploadFiles,
    handleDownload,
    deletedFiles,
    setDeletedFiles,
    tempFiles,
    setTempFiles,
    isModalOpen,
    setIsModalOpen,
    handleModalClose,
    handleFileSelect,
    duplicateFileError,
  } = useFileUpload({ uploadUrl, fetchUrl, mode: 'Create', files, setFiles, formId })

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

  const [formValue, setFormValue] = useState({
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

          const response = await createAssetsWork.mutateAsync({
            id: selectedRow?.asset_id,
            data: payload,
          })
          woId = response.data?.data?.work_order_id
          setWorkOrderId(woId)

          if (!woId) {
            throw new Error('Work ID not returned')
          }

          fileUploadUrl = `/work-orders/${woId}/attachment`

          if (files?.length > 0 && woId) {
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
            text: `Work Order "${values?.work_order_code}" ${messageSuccess}`,
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

  const handleRetryUpload = async (fileToRetry) => {
    const fileUploadUrl = `/work-orders/${workOrderId}/attachment`

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
    setTabIndex(6)
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
      errorMessage,
      mode: 'Create',
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
    formValue,
    setFormValue,
    isModalOpen,
    setIsModalOpen,
    optionsWorkPriority,
    optionsStatus,
    handleSubmit,
    fieldName,
    uploadUrl,
    fetchUrl,
    uploadModalProps,
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

export default useAssetsWorkForm
