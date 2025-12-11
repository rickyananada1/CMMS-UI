/* eslint-disable */
/* prettier-ignore-start */
import { useEffect, useMemo, useState } from 'react'
import { woTrackingActions } from '../../../slices/woTrackingSlices'
import { useSelector, useDispatch } from 'react-redux'
import {
  useCreateWorkOrder,
  useGetWorkOrder,
  useUpdateWorkOrder,
  useDeleteWorkOrder,
  useGetWorkTypes,
  useGetWorkClassifications,
  useGetWorkPriorities,
  useGetFailureCodes,
  useGetHazardGroup,
  useGetSites,
  useGetAssets,
  useGetWorkOrders,
  useGetUserSites,
} from '../services'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useGetListLocation } from 'src/views/pages/locations/pages/location/services'
import moment from 'moment'
import { useGetJobPlanDropdown } from 'src/views/pages/job-plan/page/list/services'
import { useGetPreventiveMaintenanceDropdown } from 'src/views/pages/work-order/preventive-maintenance/pages/list/services'
import { useGetFrequencySeasonalDetail } from 'src/views/pages/work-order/preventive-maintenance/pages/frequency-seasonal/services'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'
import { useGetFileUploaded } from 'src/views/pages/upload-file/services/getFileUploaded'

var work_order_statuses = [
  { value: 'WAPPR', label: 'WAPPR' },
  { value: 'APPR', label: 'APPR' },
  { value: 'WSCH', label: 'WSCH' },
  { value: 'WMATL', label: 'WMATL' },
  { value: 'WPCOND', label: 'WPCOND' },
  { value: 'INPRG', label: 'INPRG' },
  { value: 'COMP', label: 'COMP' },
  { value: 'CLOSE', label: 'CLOSE' },
  { value: 'CAN', label: 'CAN' },
  { value: 'HISTEDIT', label: 'HISTEDIT' },
]

function updateWorkOrderStatuses(currentStatus) {
  const allowedStatuses = []

  switch (currentStatus) {
    case 'WAPPR':
      allowedStatuses.push('WMATL', 'WPCOND', 'APPR', 'INPRG', 'COMP', 'CLOSE', 'CAN')
      break
    case 'APPR':
    case 'WSCH':
      allowedStatuses.push('WMATL', 'WPCOND', 'WAPPR', 'INPRG', 'COMP', 'CLOSE')
      break
    case 'WPCOND':
    case 'WMATL':
      allowedStatuses.push('WPCOND', 'WAPPR', 'INPRG', 'COMP', 'CLOSE')
      break
    case 'INPRG':
      allowedStatuses.push('WAPPR', 'WMATL', 'COMP', 'CLOSE')
      break
    case 'COMP':
      allowedStatuses.push('CLOSE')
      break
    case 'CAN':
      // No allowed changes
      break
    case 'CLOSE':
      allowedStatuses.push('HISTEDIT')
      break
    default:
      console.error(`Unknown work order status: ${currentStatus}`)
      return
  }

  // Add the current status to the allowed statuses (if not already included)
  if (!allowedStatuses.includes(currentStatus)) {
    allowedStatuses.push(currentStatus)
  }

  // Filter the original array to only include allowed statuses
  work_order_statuses.length = 0 // Clear the array
  work_order_statuses.push(...allowedStatuses.map((status) => ({ value: status, label: status })))
}

function generateWorkOrderCode() {
  const prefix = 'WO'
  const length = 8

  // Generate random alphanumeric characters (uppercase and digits)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomString = ''
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return prefix + randomString
}

const useWorkOrder = ({ mode, setAction, setTabIndex, setVisible }) => {
  const Notification = withReactContent(Swal)
  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.woTracking?.selectedWorkOrder)
  const userOrgId = useSelector((state) => state.auth?.user?.organization_id)
  const userSite = {
    site_id: useSelector((state) => state.auth?.user?.site_id),
    site: useSelector((state) => state.auth?.user?.site),
  }
  const userService = {
    ticketid: useSelector((state) => state.auth?.user?.site),
    // description: useSelector((state) => state.auth?.user?.description),
  }
  const user = useSelector((state) => state.auth)
  const visiblePopUp = useSelector((state) => state.woTracking?.visiblePopUp)

  const [errorMessagePage, setErrorMessage] = useState('')
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [disableEdit, setDisableEdit] = useState(false)
  const [isLocationChanged, setIsLocationChanged] = useState(false)
  const [isAssetChanged, setIsAssetChanged] = useState(false)
  const [isLocationDisabled, setIsLocationDisabled] = useState(false)
  const [isLocationFirst, setIsLocationFirst] = useState(null)
  const [dataFile, setDataFile] = useState([])
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isUploadSummaryModalOpen, setIsUploadSummaryModalOpen] = useState(false)
  const [uploadSummary, setUploadSummary] = useState({ successfulUploads: [], failedUploads: [] })

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    setSelectedFile(null)
  }

  const getWorkOrderService = useGetWorkOrder()
  const location = useLocation()

  const [formValue, setFormValue] = useState({
    work_order_code: generateWorkOrderCode(),
    description: null,
    location_id: null,
    asset_id: null,
    parent_wo_id: null,
    site_id:
      userSite?.site_id !== null
        ? {
            value: userSite?.site_id,
            label: userSite?.site,
          }
        : null,
    failure_code: null,
    classification: null,
    work_type: null,
    work_priority: null,
    status: null,
    hazard_id: null,

    configuration_item_id: null,
    configuration_item_description: null,
    movement_type_id: null,
    movement_type_description: null,
    cost_center_id: null,
    cost_center_description: null,
    internal_order_id: null,
    internal_order_description: null,
    wbs_id: null,
    wbs_description: null,
    vendor_id: null,
    vendor_description: null,
    gl_account_id: null,

    need_safety_approval: false,
    is_task: false,
    asset_up: false,

    job_plan_id: null,
    pm_id: null,

    ticketid: null,
    summary: null,
  })
  const [oldStatus, setOldStatus] = useState('')

  const setSelectedRow = (param) => {
    dispatch(woTrackingActions.setSelectedWorkOrder(param))
  }

  useEffect(() => {
    mode !== 'Create' ? getWorkOrder() : setIsLoading(false)
    mode === 'Delete' && deleteWorkOrder()
    mode === 'Update' && validateEdit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  const validateEdit = async () => {
    var isValidUpdate = await validateEditDelete('edit')
    if (!isValidUpdate) {
      setSelectedRow(null)
      setTabIndex(0)
      setAction('Read')
      return
    }
  }

  useEffect(() => {
    visiblePopUp && mode === 'Read' && handleDeleteParent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setVisible])

  const getWorkTypes = useGetWorkTypes()
  const getWorkPriorities = useGetWorkPriorities()
  const getWorkClassifications = useGetWorkClassifications()
  const getLocations = useGetListLocation()
  const getAssets = useGetAssets()
  const getSites = useGetSites({ org_id: userOrgId })
  const getFailureCodes = useGetFailureCodes()
  const getHazardGroup = useGetHazardGroup()
  const getWorkOrders = useGetWorkOrders()
  const site = useSelector((state) => state.auth?.user?.site)

  const getUserSites = useGetUserSites({ site })
  const getJobPlanList = useGetJobPlanDropdown()
  const getPMList = useGetPreventiveMaintenanceDropdown()

  const getWorkOrder = async (params) => {
    setIsLoading(true)
    await getWorkOrderService
      .mutateAsync({
        id: selectedRow?.work_order_id,
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

  const [files, setFiles] = useState([])

  const formId = useMemo(() => selectedRow?.work_order_id, [selectedRow])

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
  const [isNewFiles, setIsNewFiles] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState('')

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

  useEffect(() => {
    setFormDeletedFiles(deletedFiles)
  }, [deletedFiles])

  useEffect(() => {
    if (!getWorkOrderService.data?.data?.data) return
    const data = getWorkOrderService.data.data.data
    setOldStatus(data?.status)
    updateWorkOrderStatuses(data?.status)
    setFormValue((prev) => ({
      ...prev,
      ...(data?.location_id !== null && {
        location_id: {
          value: data?.location_id,
          label: data?.location,
          location_description: data?.location_desc,
        },
      }),
      ...(data?.asset_id !== null && {
        asset_id: {
          value: data?.asset_id,
          label: data?.asset_num,
          asset_description: data?.asset_desc,
        },
      }),
      ...(data?.parent_wo_id !== null && {
        parent_wo_id: {
          value: data?.parent_wo_id,
          label: data?.parent_wo,
        },
      }),
      ...(data?.site_id !== null && {
        site_id: {
          value: data?.site_id,
          label: data?.site,
        },
      }),
      ...(data?.uuid && {
        ticketid: {
          value: data.uuid,
          label: data.ticketid,
          description: data.description,
        },
      }),
      ...(data?.failure_code !== null && {
        failure_code: {
          value: data?.failure_code,
          label: data?.failure_code,
        },
      }),
      ...(data?.classification !== null && {
        classification: {
          value: data?.classification,
          label: data?.classification,
        },
      }),
      ...(data?.work_type !== null && {
        work_type: {
          value: data?.work_type,
          label: data?.work_type,
        },
      }),
      ...(data?.work_priority !== null && {
        work_priority: {
          value: data?.work_priority,
          label: data?.work_priority,
        },
      }),
      ...(data?.status !== null && {
        status: {
          value: data?.status,
          label: data?.status,
        },
      }),
      ...(data?.hazard_id !== null && {
        hazard_id: {
          value: data?.hazard_id,
          label: data?.hazard_code,
          hazard: { hazard_desc: data?.hazard_desc },
        },
      }),
      work_order_code: data?.work_order_code,
      description: data?.description,

      configuration_item_id: data?.configuration_item_id,
      configuration_item_description: data?.configuration_item_description,
      movement_type_id: data?.movement_type_id,
      movement_type_description: data?.movement_type_description,
      cost_center_id: data?.cost_center_id,
      cost_center_description: data?.cost_center_description,
      internal_order_id: data?.internal_order_id,
      internal_order_description: data?.internal_order_description,
      wbs_id: data?.wbs_id,
      wbs_description: data?.wbs_description,
      vendor_id: data?.vendor_id,
      vendor_description: data?.vendor_description,
      gl_account_id: data?.gl_account_id,

      work_order_attachment_url: data?.work_order_attachment_url,
      need_safety_approval: data?.need_safety_approval,
      is_task: data?.is_task,
      asset_up: data?.asset_up,

      ...(data?.job_plan_id !== null && {
        job_plan_id: {
          value: data?.job_plan_id,
          label: data?.plan_name,
          plan_description: data?.plan_description,
          fromPM: data?.preventive_maintenance_name !== null,
        },
      }),
      ...(data?.pm_id !== null && {
        pm_id: {
          value: data?.pm_id,
          label: data?.preventive_maintenance_name,
          preventive_maintenance_description: data?.preventive_maintenance_description,
        },
      }),

      scheduled_start: data?.scheduled_start
        ? moment(data?.scheduled_start).format('YYYY-MM-DDTHH:mm')
        : null,
      scheduled_finish: data?.scheduled_finish
        ? moment(data?.scheduled_finish).format('YYYY-MM-DDTHH:mm')
        : null,
      actual_start: data?.actual_start
        ? moment(data?.actual_start).format('YYYY-MM-DDTHH:mm')
        : null,
      actual_finish: data?.actual_finish
        ? moment(data?.actual_finish).format('YYYY-MM-DDTHH:mm')
        : null,
    }))

    setIsLocationFirst(data?.is_location_first)
    if (data?.is_location_first) {
      setIsLocationChanged(true)
      setIsAssetChanged(false)
      setIsLocationDisabled(false)
    } else {
      setIsLocationChanged(false)
      setIsAssetChanged(true)
      setIsLocationDisabled(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getWorkOrderService.data])

  const createWorkOrder = useCreateWorkOrder()
  const updateWorkOrder = useUpdateWorkOrder()

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
          ...values,
          location_id: values?.location_id?.value,
          asset_id: values?.asset_id?.value ?? null,
          parent_wo_id: values?.parent_wo_id?.value ?? null,
          site_id: values?.site_id?.value,
          classification: values?.classification?.value,
          work_type: values?.work_type?.value,
          work_priority: values?.work_priority?.value,
          failure_code: values?.failure_code?.label,
          status: values?.status?.value,
          status_date:
            values?.status?.value !== oldStatus ? moment().toISOString(true) : data.status_date,
          hazard_id: values?.hazard_id?.value,
          need_safety_approval: values?.need_safety_approval ?? false,
          is_task: values?.is_task ?? false,
          asset_up: values?.asset_up ?? false,
          configuration_item_id: values?.configuration_item_id,
          movement_type_id: values?.movement_type_id,
          cost_center_id: values?.cost_center_id,
          internal_order_id: values?.internal_order_id,
          wbs_id: values?.wbs_id,
          vendor_id: values?.vendor_id,
          gl_account_id: values?.gl_account_id,
          service_request_id: values?.ticketid?.value,
          job_plan_id: values?.job_plan_id?.value,
          pm_id: values?.pm_id?.value,

          scheduled_start: values?.scheduled_start
            ? moment(values?.scheduled_start).toISOString(true)
            : null,
          scheduled_finish: values?.scheduled_finish
            ? moment(values?.scheduled_finish).toISOString(true)
            : null,
          actual_start: values?.actual_start
            ? moment(values?.actual_start).toISOString(true)
            : null,
          actual_finish: values?.actual_finish
            ? moment(values?.actual_finish).toISOString(true)
            : null,

          is_location_first: values?.is_location_first,
        }

        let woId
        let fileUploadUrl
        try {
          if (mode === 'Create') {
            const response = await createWorkOrder.mutateAsync({ data: modifiedFormData })
            woId = response?.data?.data?.work_order_id

            if (!woId) {
              throw new Error('Work Order ID not returned')
            }

            fileUploadUrl = `/work-orders/${woId}/attachment`
          } else {
            const updateRes = await updateWorkOrder.mutateAsync({
              id: selectedRow?.work_order_id,
              data: modifiedFormData,
            })
            woId = selectedRow?.work_order_id
            fileUploadUrl = uploadUrl // Use existing URL for update mode

            if (!updateRes || !woId) {
              throw new Error('Update failed or missing ID')
            }
          }

          // Handle file operations
          if (mode === 'Update' && deletedFiles?.length > 0) {
            await deletePendingFiles(deletedFiles)
          }

          // Upload files with the correct URL
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
            text: `Work Order ${messageSuccess}`,
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
    const fileUploadUrl = `/asset/${selectedRow?.asset_id}/attachment` // Assuming assetId is available

    setUploadSummary((prevSummary) => ({
      ...prevSummary,
      failedUploads: prevSummary.failedUploads.filter((item) => item.file !== fileToRetry),
    }))

    const result = await uploadFiles([fileToRetry], fileUploadUrl, formId) // Pass formId if needed

    setUploadSummary((prevSummary) => ({
      successfulUploads: [...prevSummary.successfulUploads, ...result.successfulUploads],
      failedUploads: [...prevSummary.failedUploads, ...result.failedUploads],
    }))
  }

  const handleOK = () => {
    setTabIndex(0)
    setAction('Read')
  }

  const deleteWorkOrderService = useDeleteWorkOrder()

  const validateEditDelete = async (type = 'edit') => {
    const notifTitle = `Unable to ${type} Work Order`
    return new Promise((resolve) => {
      if (
        selectedRow.parent_wo_id !== null &&
        !['INPRG', 'COMP', 'CLOSE'].includes(selectedRow.status)
      ) {
        setDisableEdit(true)
        resolve(true)
      } else if (selectedRow.status === 'INPRG' && selectedRow.parent_wo_id === null) {
        setDisableEdit(true)
        resolve(true)
      } else if (selectedRow.status === 'INPRG') {
        Notification.fire({
          icon: 'error',
          title: notifTitle,
          html: `Work Order already started ${type === 'edit' ? '<br>Please use Work Order Actuals tab to edit' : ''
            }`,
        }).then(async (result) => {
          if (result.isConfirmed || result.isDismissed) {
            resolve(false)
          }
        })
      } else if (selectedRow.status === 'CLOSE') {
        Notification.fire({
          icon: 'error',
          title: notifTitle,
          html: `Work Order already closed ${type === 'edit' ? '<br>Please use Work Order Actuals tab to edit' : ''
            }`,
        }).then(async (result) => {
          if (result.isConfirmed || result.isDismissed) {
            resolve(false)
          }
        })
      } else if (selectedRow.status === 'COMP') {
        Notification.fire({
          icon: 'error',
          title: notifTitle,
          html: `Work Order already completed ${type === 'edit' ? '<br>Please use Work Order Actuals tab to edit' : ''
            }`,
        }).then(async (result) => {
          if (result.isConfirmed || result.isDismissed) {
            resolve(false)
          }
        })
      } else if (selectedRow.parent_wo_id !== null) {
        Notification.fire({
          icon: 'error',
          title: notifTitle,
          html: `Work Order has a parent ${type === 'edit' ? '<br>Please use Work Order Actuals tab to edit' : ''
            }`,
        }).then(async (result) => {
          if (result.isConfirmed || result.isDismissed) {
            resolve(false)
          }
        })
      } else {
        resolve(true)
      }
    })
  }

  const deleteWorkOrder = async () => {
    var isValidDelete = await validateEditDelete('delete')
    if (!isValidDelete) {
      setSelectedRow(null)
      setTabIndex(0)
      setAction('Read')
      return
    }

    Notification.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Do you want to delete ${selectedRow.work_order_code}?`,
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteWorkOrderService
          .mutateAsync({
            id: selectedRow.work_order_id,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: `${selectedRow.work_order_code} deleted successfully`,
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

  const handleDeleteParent = () => {
    Notification.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Do you want to delete ${data?.parent_wo ?? '-'} as a Parent of ${data?.work_order_code
        }?`,
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const dataWithRemovedParent = {
          ...data,
          parent_wo_id: null,
        }

        await updateWorkOrder
          .mutateAsync({
            id: selectedRow.work_order_id,
            data: dataWithRemovedParent,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Work Order parent deleted successfully.`,
            }).then(() => {
              setSelectedRow({ ...selectedRow, parent_wo_id: null })
              setData({ ...selectedRow, parent_wo_id: null })
              setAction('Read')
              setVisible(false)
            })
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Error!',
              text: err.response.data.message,
            })
            setVisible(false)
            setErrorMessage(err.response.data.message)
          })
      } else {
        setVisible(false)
      }
    })
  }

  const getFrequencySeasonalDetail = useGetFrequencySeasonalDetail()

  const getFrequencySeasonal = async (pm_id) => {
    return await getFrequencySeasonalDetail
      .mutateAsync({
        id: pm_id,
      })
      .then((res) => {
        return res?.data?.data?.estimated_next_schedule
      })
      .catch((err) => {
        Notification.fire({
          icon: 'error',
          title: 'Error!',
          text: `Error while while fetching Scheduled Start date: ${err?.response?.data?.message}`,
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const getScheduledDateFromPM = async (pm_id) => {
    return await getFrequencySeasonal(pm_id)
  }

  const getDetailFile = useGetFileUploaded({
    url: `/work-orders/${selectedRow?.work_order_id}/attachment`,
    config: {
      enabled: false,
    },
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

  return {
    data,
    isLoading,
    errorMessagePage,
    formValue,
    selectedRow,
    setSelectedRow,
    handleSubmit,
    getWorkTypes,
    getWorkPriorities,
    getWorkClassifications,
    getLocations,
    getAssets,
    getSites,
    getFailureCodes,
    getHazardGroup,
    getWorkOrders,
    getUserSites,
    work_order_statuses,
    disableEdit,
    getJobPlanList,
    getPMList,
    getScheduledDateFromPM,
    isLocationChanged,
    setIsLocationChanged,
    isAssetChanged,
    setIsAssetChanged,
    isLocationDisabled,
    setIsLocationDisabled,
    isLocationFirst,
    setIsLocationFirst,
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

export default useWorkOrder
