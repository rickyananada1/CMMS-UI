import {
  useServiceOrganizationCreate,
  useServiceOrganizationDetail,
  useServiceOrganizationUpdate,
} from '../services'
import { useLocation as useLocationRouter } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'

const useOrganizationForm = (mode, setAction, setTabIndex) => {
  const fieldName = 'files'
  const location = useLocationRouter()
  const Notification = withReactContent(Swal)
  const selectedRow = useSelector((state) => state.organization?.selectedGroup)
  const sitesSchema = Yup.object().shape({
    organization_name: Yup.string().required('Field is required'),
    organization_description: Yup.string().required('Field is required'),
  })

  const { uploadUrl, fetchUrl } = useMemo(() => {
    if (mode === 'Update' && selectedRow?.organization_id) {
      const orgId = selectedRow.organization_id
      return {
        uploadUrl: `/administration/organizations/${orgId}/attachments`,
        fetchUrl: `/administration/organizations/${orgId}/attachments`,
      }
    }

    return {
      uploadUrl: '',
      fetchUrl: '',
    }
  }, [mode, selectedRow])

  const [files, setFiles] = useState([])

  const formId = useMemo(() => selectedRow?.organization_id, [selectedRow])

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

  const [isNewFiles, setIsNewFiles] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState('')
  const [formDeletedFiles, setFormDeletedFiles] = useState([])
  const [isUploadSummaryModalOpen, setIsUploadSummaryModalOpen] = useState(false)
  const [uploadSummary, setUploadSummary] = useState({ successfulUploads: [], failedUploads: [] })
  const [formValue, setFormValue] = useState({
    organization_id: '',
    organization_name: '',
    organization_description: '',
    base_currency: { label: 'IDR', value: 'IDR' },
    base_currency_description: 'Indonesia Rupiah',
    item_set: '',
    item_set_description: '',
    company_set: '',
    company_set_description: '',
    default_item_status: '',
    default_stock_category: '',
    clearing_account: '',
    is_active: null,
  })

  const [formSelectOpt] = useState({
    itemSetOpt: [
      {
        label: 'ITEMSET',
        value: 'ITEMSET',
      },
    ],
    defaultItemStatusOpt: [
      {
        label: 'Pending',
        value: 'Pending',
      },
      {
        label: 'Planning',
        value: 'Planning',
      },
      {
        label: 'Active',
        value: 'Active',
      },
      {
        label: 'Pending Obsolescence',
        value: 'Pending Obsolescence',
      },
      {
        label: 'Obsolete',
        value: 'Obsolete',
      },
    ],
    defaultStockCategoryOpt: [
      {
        label: 'STK',
        value: 'STK',
      },
    ],
    baseCurrencyOpt: [
      {
        label: 'IDR',
        value: 'IDR',
      },
    ],
    companySetOpt: [
      {
        label: 'COMPSET',
        value: 'COMPSET',
      },
    ],
    clearingAccountOpt: [
      {
        label: '????-????-??',
        value: '????-????-??',
      },
    ],
  })

  const serviceCreate = useServiceOrganizationCreate()
  const serviceUpdate = useServiceOrganizationUpdate()
  const serviceDetail = useServiceOrganizationDetail({
    id: selectedRow?.organization_id,
    config: {
      enabled: false,
    },
  })

  useEffect(() => {
    if (mode !== 'Create') {
      serviceDetail.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode === 'Create') return
    const dataOrganization = serviceDetail?.data?.data?.data

    setFormValue((prev) => ({
      ...prev,
      ...dataOrganization,
      default_item_status: formSelectOpt.defaultItemStatusOpt.find(
        (el) => el.value === dataOrganization.default_item_status,
      ),
      base_currency_description: 'Indonesia Rupiah',
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceDetail.data, mode])

  useEffect(() => {
    setFormDeletedFiles(deletedFiles)
  }, [deletedFiles])

  const handleSubmit = async (values, formikHelpers) => {
    let payload = values
    payload.base_currency = values.base_currency?.value ?? ''

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
        const newValues = {
          organization_name: values.organization_name,
          organization_description: values.organization_description,
          base_currency: values.base_currency?.value ?? '',
          base_currency_description: values.base_currency_description,
          item_set: values.item_set,
          item_set_description: values.item_set_description,
          company_set: values.company_set,
          company_set_description: values.company_set_description,
          default_item_status: values.default_item_status?.value,
          default_stock_category: values.default_stock_category,
          clearing_account: values.clearing_account,
          is_active: values.is_active,
        }

        try {
          let organizationId
          let fileUploadUrl

          if (mode === 'Create') {
            const response = await serviceCreate.mutateAsync({ data: newValues })
            organizationId = response?.data?.data?.organization_id

            if (!organizationId) {
              throw new Error('Orgnization ID not returned')
            }

            fileUploadUrl = `/administration/organizations/${organizationId}/attachments`
          } else {
            const updateRes = await serviceUpdate.mutateAsync({
              id: selectedRow?.organization_id,
              data: newValues,
            })

            organizationId = selectedRow?.organization_id
            fileUploadUrl = uploadUrl

            if (!updateRes || !organizationId) {
              throw new Error('Update failed or missing ID')
            }
          }

          if (mode === 'Update' && deletedFiles?.length > 0) {
            await deletePendingFiles(deletedFiles)
          }

          if (files?.length > 0 && organizationId) {
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
            text: `Organization ${messageSuccess}`,
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
    const fileUploadUrl = `/administration/organizations/${selectedRow?.job_plan_id}/attachments`

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
      handleDownload,
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

  useEffect(() => {
    const hasNewFiles = files?.some((item) => item instanceof File)
    const hasDeletedFiles = deletedFiles?.length > 0
    setIsNewFiles(hasNewFiles || hasDeletedFiles)

    const message =
      hasNewFiles || hasDeletedFiles
        ? '& attachment document saved successfully'
        : 'saved successfully'
    setMessageSuccess(message)
  }, [files, deletedFiles])

  return {
    errorMessage,
    sitesSchema,
    handleSubmit,
    formValue,
    setFormValue,
    formSelectOpt,
    selectedRow,
    mode,
    isModalOpen,
    setIsModalOpen,
    fieldName,
    uploadUrl,
    fetchUrl,
    formDeletedFiles,
    uploadModalProps,
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

export default useOrganizationForm
