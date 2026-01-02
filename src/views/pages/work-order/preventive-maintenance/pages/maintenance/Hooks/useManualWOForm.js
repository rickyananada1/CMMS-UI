import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetPreventiveMaintenance, useCreatePMWorkOrder } from '../services'

import {
  useGetWorkOrders,
  useGetWorkTypes,
  useGetWorkClassifications,
  useGetWorkPriorities,
  useGetFailureCodes,
  useGetHazardGroup,
  useGetSites,
  useGetAssets,
  useUploadFile,
} from 'src/views/pages/work-order/work-order-tracking/pages/work-order/services'

import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useGetListLocation } from 'src/views/pages/locations/pages/location/services'
import { useDownloadFile } from 'src/views/pages/upload-file/services/downloadFile'
import { useGetJobPlanDropdown } from 'src/views/pages/job-plan/page/list/services'
import useTimeFormatter from 'src/hooks/useTimeFormatter'

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

const useManualWOForm = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)
  const selectedRow = useSelector(
    (state) => state.preventiveMaintenances?.selectedPreventiveMaintenance,
  )
  const userOrgId = useSelector((state) => state.auth?.user?.organization_id)
  const userSite = {
    site_id: useSelector((state) => state.auth?.user?.site_id),
    site: useSelector((state) => state.auth?.user?.site),
  }

  const { formatDateToUTC } = useTimeFormatter()

  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const getPMService = useGetPreventiveMaintenance()
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
  })

  useEffect(() => {
    getPreventiveMaintenance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  const getWorkTypes = useGetWorkTypes()
  const getWorkPriorities = useGetWorkPriorities()
  const getWorkClassifications = useGetWorkClassifications()
  const getLocations = useGetListLocation()
  const getAssets = useGetAssets()
  const getSites = useGetSites({ org_id: userOrgId })
  const getFailureCodes = useGetFailureCodes()
  const getHazardGroup = useGetHazardGroup()
  const getWorkOrders = useGetWorkOrders()
  const getJobPlanList = useGetJobPlanDropdown()

  const getPreventiveMaintenance = async (params) => {
    setIsLoading(true)
    await getPMService
      .mutateAsync({
        id: selectedRow?.preventive_maintenance_id,
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

  const uploadFileService = useUploadFile()

  const uploadFile = async (attachment, site_id) => {
    var fileFormData = new FormData()
    fileFormData.append('model', 'work_order')
    fileFormData.append('model_id', site_id ?? 1)
    fileFormData.append('files', attachment)

    return await uploadFileService
      .mutateAsync({
        data: fileFormData,
      })
      .then((res) => {
        return res.data.data[0].url
      })
      .catch((err) => {
        Notification.fire({
          icon: 'error',
          title: 'Error!',
          text: `Attachment Upload Failed: ${err.response.data.message}`,
        }).then(() => {
          return false
        })
      })
  }

  useEffect(() => {
    if (!getPMService.data?.data?.data) return
    const data = getPMService.data.data.data
    updateWorkOrderStatuses(data?.work_order_status)
    setFormValue((prev) => ({
      ...prev,
      location_id: {
        value: data?.location_id,
        label: data?.location,
        location_description: data?.location_description,
      },
      asset_id: {
        value: data?.asset_id,
        label: data?.asset_num,
        asset_description: data?.asset_description,
      },
      site_id: {
        value: data?.site_id,
        label: data?.site,
      },
      status: {
        value: data?.work_order_status,
        label: data?.work_order_status,
      },
      work_type: {
        value: data?.work_type,
        label: data?.work_type,
      },
      ...(data?.job_plan_id !== null && {
        job_plan_id: {
          value: data?.job_plan_id,
          label: data?.plan_name,
          plan_description: data?.plan_description,
        },
      }),
    }))
  }, [getPMService.data])

  const createWorkOrder = useCreatePMWorkOrder()

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
        var attachment_url = values?.work_order_attachment_url ?? null
        if (values.work_order_file !== undefined) {
          attachment_url = await uploadFile(values.work_order_file, values?.site_id?.value)
          if (attachment_url === false) {
            formikHelpers.setSubmitting(false)
            console.error('file upload error')
            return
          }
        }
        const modifiedFormData = {
          ...values,
          location_id: values?.location_id?.value,
          asset_id: values?.asset_id?.value,
          parent_wo_id: values?.parent_wo_id?.value ?? null,
          site_id: values?.site_id?.value,
          classification: values?.classification?.value,
          work_type: values?.work_type?.value,
          work_priority: values?.work_priority?.value,
          failure_code: values?.failure_code?.label,
          status: values?.status?.value,
          hazard_id: values?.hazard_id?.value,
          need_safety_approval: values?.need_safety_approval ?? false,
          is_task: values?.is_task ?? false,
          asset_up: values?.asset_up ?? false,
          ...(attachment_url !== null && { work_order_attachment_url: attachment_url }),

          configuration_item_id: parseInt(values?.configuration_item_id) || null,
          movement_type_id: parseInt(values?.movement_type_id) || null,
          cost_center_id: parseInt(values?.cost_center_id) || null,
          internal_order_id: parseInt(values?.internal_order_id) || null,
          wbs_id: parseInt(values?.wbs_id) || null,
          vendor_id: parseInt(values?.vendor_id) || null,
          gl_account_id: parseInt(values?.gl_account_id) || null,

          job_plan_id: values?.job_plan_id?.value,

          actual_start: values?.actual_start ? formatDateToUTC(values?.actual_start) : null,
          actual_finish: values?.actual_finish ? formatDateToUTC(values?.actual_finish) : null,
        }
        if (mode === 'Create PM WO') {
          await createWorkOrder
            .mutateAsync({
              id: selectedRow.preventive_maintenance_id,
              data: modifiedFormData,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `PM Work Order added successfully.`,
              }).then(() => {
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
            .finally(() => {
              formikHelpers.setSubmitting(false)
            })
        }
      }
    })
  }

  const downloadFile = useDownloadFile()

  const handleDownload = async (params) => {
    const link = data?.work_order_attachment_url
    const linkDownload = link.split('api')
    await downloadFile
      .mutateAsync({
        link: linkDownload[1],
        params: params,
      })
      .then((res) => {
        const contentType = res.headers['content-type']
        let fileExtension = 'file'

        // eslint-disable-next-line default-case
        switch (contentType) {
          case 'application/pdf':
            fileExtension = 'pdf'
            break
          case 'image/jpeg':
          case 'image/jpg':
            fileExtension = 'jpg'
            break
          case 'text/plain':
            fileExtension = 'txt'
            break
          case 'application/vnd.ms-excel':
            fileExtension = 'xls'
            break
          case 'application/msword':
            fileExtension = 'doc'
            break
        }

        const blob = new Blob([res?.data], { type: contentType })
        const url = window.URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = `${new Date().toISOString()}.${fileExtension}`
        document.body.appendChild(a)
        a.click()

        window.URL.revokeObjectURL(url)

        Notification.fire({
          icon: 'success',
          title: 'Success',
          text: 'Successfully downloaded the file',
          customClass: {
            confirmButton: 'btn btn-primary hover:text-white',
          },
          buttonsStyling: false,
        })
      })
      .catch((err) => {
        Notification.fire({
          icon: 'error',
          title: 'Error!',
          text: err?.response?.data?.message ?? err?.response?.statusText,
          customClass: {
            confirmButton: 'btn btn-primary hover:text-white',
          },
          buttonsStyling: false,
        })
      })
  }

  return {
    data,
    isLoading,
    errorMessage,
    formValue,
    selectedRow,
    handleSubmit,
    handleDownload,
    getWorkTypes,
    getWorkPriorities,
    getWorkClassifications,
    getLocations,
    getAssets,
    getSites,
    getFailureCodes,
    getHazardGroup,
    getWorkOrders,
    work_order_statuses,
    getJobPlanList,
  }
}

export default useManualWOForm
