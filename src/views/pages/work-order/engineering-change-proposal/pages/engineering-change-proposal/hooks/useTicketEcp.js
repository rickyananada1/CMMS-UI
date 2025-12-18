/* eslint-disable */
/* prettier-ignore-start */
import { useEffect, useMemo, useState } from 'react'
import { ticketEcpActions } from '../../../slices/ticketEcpSlice'
import { useSelector, useDispatch } from 'react-redux'
import {
  useCreateTicketEcp,
  useGetTicketEcp,
  useUpdateTicketEcp,
  useDeleteTicketEcp,
  useGetTicketEcps,
  useGetReportBy,
  useGetFailureCodes,
  useGetSites,
  useGetAssets,
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
import { organizationActions } from 'src/views/pages/organization/slices/organizationSlices'

var ticket_ecp_statuses = [
  { value: 'NEW', label: 'NEW' },
  { value: 'WAPPR', label: 'WAPPR' },
  { value: 'APPR', label: 'APPR' },
  { value: 'REJECT', label: 'REJECT' },
  { value: 'WSCH', label: 'WSCH' },
  { value: 'INPRG', label: 'INPRG' },
  { value: 'RESOLVED', label: 'RESOLVED' },
  { value: 'COMP', label: 'COMP' },
  { value: 'CLOSED', label: 'CLOSED' },
  { value: 'CAN', label: 'CAN' },
]


function updateTicketEcpStatuses(currentStatus) {
  const validStatuses = [
    'NEW',
    'WAPPR',
    'APPR',
    'REJECT',
    'WSCH',
    'INPRG',
    'RESOLVED',
    'COMP',
    'CLOSED',
    'CAN'];

  if (!validStatuses.includes(currentStatus)) {
    console.error(`Unknown service request status: ${currentStatus}`);
    return;
  }
  ticket_ecp_statuses.length = 0;
  ticket_ecp_statuses.push({ value: currentStatus, label: currentStatus });
}

function generateTicketEcp() {
  const prefix = 'ECP'
  const length = 8

  // Generate random alphanumeric characters (uppercase and digits)
  const characters = '0123456789'
  let randomString = ''
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return prefix + randomString
}

const useTicketEcp = ({ mode, setAction, setTabIndex, setVisible, formik }) => {
  const Notification = withReactContent(Swal)
  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.ticketEcp?.selectedTicketEcp)
  const userOrgId = useSelector((state) => state.auth?.user?.organization_id)
  const userLogin = useSelector((state) => state.auth?.user)
  const phone_number = userLogin?.phone_number
  const email = userLogin?.email
  const organization_name = userLogin?.organization_name

  const userSite = {
    site_id: useSelector((state) => state.auth?.user?.site_id),
    site: useSelector((state) => state.auth?.user?.site),
  }
  const userService = {
    ticketid: useSelector((state) => state.auth?.user?.site),
    // description: useSelector((state) => state.auth?.user?.description),
  }
  const repId = {
    user_id: useSelector((state) => state.auth?.user?.user_id),
    reportedby: useSelector((state) => state.auth?.user?.display_name),
  }
  const user = useSelector((state) => state.auth)
  const visiblePopUp = useSelector((state) => state.ticketEcp?.visiblePopUp)

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

  const getTicketEcpService = useGetTicketEcp()
  const location = useLocation()

  const [formValue, setFormValue] = useState({
    ticketid: generateTicketEcp(),
    description: null,
    location_id: null,
    location: null,
    location_description: null,
    asset_id: null,
    asset_id: null,
    asset_num: null,
    asset_description: null,
    site_id:
      userSite?.site_id !== null
        ? {
          value: userSite?.site_id,
          label: userSite?.site,
        }
        : null,
    status: null,
    detailsummary: null,
    reportedby:
      repId?.user_id !== null
        ? {
          value: repId?.user_id,
          label: repId?.reportedby,
        }
        : null,
    display_name:
      repId?.user_id !== null
        ? {
          value: repId?.user_id,
          label: repId?.reportedby,
        }
        : null,
    reporteddate: null,
    organization_id: null,
    reportedphone: phone_number ?? null,
    reportedemail: email ?? null,
    organization: organization_name ?? null,
  })
  const [oldStatus, setOldStatus] = useState('')

  const setSelectedRow = (param) => {
    dispatch(ticketEcpActions.setSelectedTicketEcp(param))
  }

  useEffect(() => {
    mode !== 'Create' ? getTicketEcps() : setIsLoading(false)
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
    if (!formik || !userLogin) return

    formik.setFieldValue('email', userLogin.email || '')
    formik.setFieldValue('reportedphone', userLogin.phone_number || '')
    formik.setFieldValue(
      'organization_name',
      userLogin.organization_name || ''
    )
  }, [userLogin])

  useEffect(() => {
    visiblePopUp && mode === 'Read' && handleDeleteParent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setVisible])

  const getLocations = useGetListLocation()
  const getAssets = useGetAssets()
  const getSites = useGetSites({ org_id: userOrgId })
  // const getFailureCodes = useGetFailureCodes()
  const getDatTicketEcp = useGetTicketEcps()
  const site = useSelector((state) => state.auth?.user?.site)
  const getReportBy = useGetReportBy()
  const getUserSites = useGetUserSites({ site })
  const getJobPlanList = useGetJobPlanDropdown()
  const getPMList = useGetPreventiveMaintenanceDropdown()

  const getTicketEcps = async (params) => {
    setIsLoading(true)
    await getTicketEcpService
      .mutateAsync({
        id: selectedRow?.uuid,
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
    if (mode === 'Update' && selectedRow?.uuid) {
      const woId = selectedRow.uuid
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

  const formId = useMemo(() => selectedRow?.uuid, [selectedRow])

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
    if (!getTicketEcpService.data?.data?.data) return
    const data = getTicketEcpService.data.data.data
    setOldStatus(data?.status)
    // updateTicketEcpStatuses(data?.status)
    if (data?.status) {
      updateTicketEcpStatuses(data.status)
    }
    const row = data[0];
    setFormValue((prev) => ({
      ...prev,
      ...(data?.location && {
        location_id: {
          value: data.location_id ?? data.location,
          label: `${data.location} - ${data.location_description ?? ''}`,
          location: data.location,
          location_description: data.location_description ?? '',
        },
      }),
      ...(data?.asset_id !== null && {
        asset_id: {
          value: data?.asset_id,
          label: data?.assetnum,
          asset_description: data?.asset_description,
          site: data?.site,
        },
      }),
      // ...(data?.reportedby !== null && {
      //   reportedby: {
      //     value: data?.user_id,
      //     label: data?.display_name,
      //   },
      // }),
      // ...(data?.reportedby && {
      //   reportedby: data?.reportedby || "",
      // }),
      ...(data?.reportedby !== null && {
        reportedOrg: {
          value: data?.reportedby,
          label: data?.display_name,
          site_code: data.reported
        },
      }),
      ...(data?.siteid && {
        siteid: {
          value: data.siteid,
          label: data.siteid,
        },
      }),

      ...(data?.status !== null && {
        status: {
          value: data?.status,
          label: data?.status,
        },
      }),
      ticketid: data?.ticketid,
      // affectedperson: data?.affectedperson,
      description: data?.description,
      detailsummary: data?.detailsummary,
      asset_description: data?.asset_description,
      location_description: data?.location_description,
      display_name: data?.display_name,

      ticekt_ecp_attachment_url: data?.ticekt_ecp_attachment_url,
      reportedphone: data?.phone_number ?? prev.phone_number ?? null,
      reportedemail: data?.email ?? prev.email ?? null,
      organization:
        data?.organization_name ?? prev.organization_id ?? organization_name ?? null,
      reporteddate: data?.reporteddate
        ? moment(data.reporteddate).format('YYYY-MM-DDTHH:mm')
        : prev.reporteddate || moment().format('YYYY-MM-DDTHH:mm'),
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
  }, [getTicketEcpService.data])


  const createTicketEcp = useCreateTicketEcp()
  const updateTicketEcp = useUpdateTicketEcp()

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
          location_id: values?.location_id?.value ?? null,
          location: values?.location_id?.location ?? null,
          location_description: values?.location_id?.location_description ?? null,
          asset_id: values?.asset_id?.value ?? null,
          assetnum: values?.asset_id?.label ?? null,
          asset_description: values?.asset_description ?? values?.asset_id?.asset_description ?? null,
          reportedby: values?.reportedby?.label
            ? String(values.reportedby.label)
            : null,
          display_name: values?.reportedby?.label
            ? String(values.reportedby.label)
            : null,
          reportedemail: values?.email || '',
          reportedphone: values?.reportedphone || '',
          organization_name: values?.organization_name || '',
          siteid:
            values?.site_id?.value
              ? String(values.site_id.value)
              : values?.asset_id?.site
                ? String(values.asset_id.site)
                : null,
          description: values?.description || "",
          status: values?.status?.value ?? null,
          detailsummary: values?.detailsummary || "",
          // organization_id: userOrgId || "",
          reportdate: values?.reportdate
            ? moment(values.reportdate).format('YYYY-MM-DD')
            : moment().format('YYYY-MM-DD'),
          is_location_first: values?.is_location_first,
        }

        let woId
        let fileUploadUrl
        try {
          if (mode === 'Create') {
            const response = await createTicketEcp.mutateAsync({ data: modifiedFormData })
            woId = response?.data?.data?.uuid

            if (!woId) {
              throw new Error('Work Order ID not returned')
            }

            fileUploadUrl = `/work-orders/${woId}/attachment`
          } else {
            const updateRes = await updateTicketEcp.mutateAsync({
              id: selectedRow?.uuid,
              data: modifiedFormData,
            })
            woId = selectedRow?.uuid
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

  const deleteTicketEcpService = useDeleteTicketEcp()

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
        await deleteTicketEcpService
          .mutateAsync({
            id: selectedRow.uuid,
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

        await updateTicketEcp
          .mutateAsync({
            id: selectedRow.uuid,
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
    url: `/work-orders/${selectedRow?.uuid}/attachment`,
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
    getLocations,
    getAssets,
    getSites,
    getUserSites,
    ticket_ecp_statuses,
    getReportBy,
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
    getDatTicketEcp,
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
    formik,
  }
}

export default useTicketEcp
