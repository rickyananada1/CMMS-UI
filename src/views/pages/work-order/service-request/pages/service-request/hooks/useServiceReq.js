/* eslint-disable */
/* prettier-ignore-start */
import { useEffect, useMemo, useState } from 'react'
import { serviceRequestActions } from '../../../slices/serviceRequestSlice'
import { useSelector, useDispatch } from 'react-redux'
import {
  useCreateServiceRequest,
  useGetServiceReq,
  useUpdateServiceReq,
  useDeleteServiceRequest,
  useGetAssets,
  useGetSites,
  useGetServiceReqs,
  useGetUserSites,
  useGetReportBy,
} from '../services'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useGetListLocation } from 'src/views/pages/locations/pages/location/services'
import moment from 'moment'
import { useGetFrequencySeasonalDetail } from 'src/views/pages/work-order/preventive-maintenance/pages/frequency-seasonal/services'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'
import { useGetFileUploaded } from 'src/views/pages/upload-file/services/getFileUploaded'

var work_order_statuses = [
  { value: 'WOCREATED', label: 'WO Created' },
  { value: 'QUEUED', label: 'QUEUED' },
  { value: 'WAPPR', label: 'WAPPR' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'RESOLVED', label: 'Resolved' },
  { value: 'CLOSED', label: 'Closed' },
  { value: 'CANCEL', label: 'Cancel' },
  { value: 'REVISED', label: 'Revised' },
  { value: 'NEW', label: 'NEW' },
]

function updateWorkOrderStatuses(currentStatus) {
  const validStatuses = ['QUEUED', 'WAPPR', 'WOCREATED', 'RESOLVED', 'CLOSED', 'CANCEL', 'REVISED', 'NEW'];

  if (!validStatuses.includes(currentStatus)) {
    return;
  }

  work_order_statuses.length = 0;

  validStatuses.forEach(status => {
    work_order_statuses.push({
      value: status,
      label: status,
    });
  });
}

function generateServiceRequest() {
  const prefix = 'SR'
  const length = 5

  // Generate random alphanumeric characters (uppercase and digits)
  const characters = '0123456789'
  let randomString = ''
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return prefix + randomString
}

const useServiceReq = ({ mode, setAction, setTabIndex, setVisible }) => {
  const Notification = withReactContent(Swal)
  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.serviceRequest?.selectedServiceRequest)
  const userOrgId = useSelector((state) => state.auth?.user?.organization_id)
  const siteid = useSelector((state) => state.auth?.user?.site)
  const reportedOrg = useSelector((state) => state.auth?.user?.user_id)
  const oke = useSelector((state) => state.auth?.user?.site)
  const repId = {
    user_id: useSelector((state) => state.auth?.user?.user_id),
    reportedby: useSelector((state) => state.auth?.user?.display_name),
  }
  const userSite = {
    siteid: useSelector((state) => state.auth?.user?.site_id),
    site: useSelector((state) => state.auth?.user?.site),
  }
  const visiblePopUp = useSelector((state) => state.serviceRequest?.visiblePopUp)

  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [disableEdit, setDisableEdit] = useState(false)
  const [isLocationChanged, setIsLocationChanged] = useState(false)
  const [isAssetChanged, setIsAssetChanged] = useState(false)
  const [isLocationDisabled, setIsLocationDisabled] = useState(false)
  const [isLocationFirst, setIsLocationFirst] = useState(null)
  // const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataFile, setDataFile] = useState([])
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isUploadSummaryModalOpen, setIsUploadSummaryModalOpen] = useState(false)
  const [uploadSummary, setUploadSummary] = useState({ successfulUploads: [], failedUploads: [] })

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    setSelectedFile(null)
  }

  const getServiceRequestService = useGetServiceReq()
  const location = useLocation()

  const [formValue, setFormValue] = useState({
    ticketid: generateServiceRequest(),
    description: "",          // text input
    status: null,             // select
    detailsummary: "",        // Editor

    // LOCATION
    location_id: null,        // select
    // location: "",             // string
    // location_description: "", // textarea

    // ASSET
    asset_id: null,           // select
    asset_num: "",             // string
    asset_description: "",    // textarea

    // SITE
    site_id:
      userSite?.siteid !== null
        ? {
          value: userSite?.siteid,
          label: userSite?.site,
        }
        : null,

    glaccount: "",            // text input

    // REPORTED
    reportedby:
      repId?.user_id !== null
        ? {
          value: repId?.user_id,
          label: repId?.reportedby,
        }
        : null,
    reporteddate: "",         // date
    display_name: "",

    // PERSON
    affectedperson: null,     // select
    user_id: null,            // optional
    // affecteddate: "",         // date

    // DATES
    targetstart: "",          // date
    targetfinish: "",         // date
    actualstart: "",          // date
    actualfinish: "",         // date
  });

  const [oldStatus, setOldStatus] = useState('')
  const [assetParams, setAssetParams] = useState({})


  const setSelectedRow = (param) => {
    dispatch(serviceRequestActions.setSelectedServiceReq(param))
  }

  useEffect(() => {
    mode !== 'Create' ? getServReq() : setIsLoading(false)
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

  const getLocations = useGetListLocation()
  const getAssets = useGetAssets()
  const getAssetsLoc = useGetAssets(assetParams)
  const { data: assetOptions = [] } = useGetAssets()
  const getUserSite = useGetUserSites({ siteid: siteid })
  const affectedperson = {
    user_id: useSelector((state) => state.auth?.user?.user_id),
    reportedby: useSelector((state) => state.auth?.user?.display_name),
  }
  const getUserLogin = useGetServiceReqs()
  const getReportBy = useGetReportBy()
  const getSites = useGetSites({ org_id: userOrgId })
  const getWorkOrders = useGetServiceReqs()

  const getServReq = async (params) => {
    setIsLoading(true)
    await getServiceRequestService
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
        uploadUrl: `/servicerequests/${woId}/attachment`,
        fetchUrl: `/servicerequests/${woId}/attachment`,
      }
    }
    // For create mode, return empty strings
    return {
      uploadUrl: '',
      fetchUrl: '',
    }
  }, [mode, selectedRow])

  // const fileUploadProps = useMemo(
  //   () => ({
  //     fieldName,
  //     uploadUrl,
  //     fetchUrl,
  //     mode,
  //   }),
  //   [fieldName, uploadUrl, fetchUrl, mode],
  // )

  const [files, setFiles] = useState([])
  const formId = useMemo(() => selectedRow?.uuid, [selectedRow])

  const {
    errorMessage: messageError,
    onDrop,
    removeFiles,
    MAX_FILE_SIZE,
    acceptedFileTypes,
    uploadFiles,
    handleDownload,
    setDeletedFiles,
    deletePendingFiles,
    deletedFiles,
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
    if (!getServiceRequestService.data?.data?.data) return
    const data = getServiceRequestService.data.data.data
    setOldStatus(data?.status)
    // updateWorkOrderStatuses(data?.status)
    if (data?.status) {
      updateWorkOrderStatuses(data.status)
    }
    const row = data[0];
    setFormValue((prev) => ({
      ...prev,
      ...(data?.location_id !== null && {
        location_id: {
          value: data.location_id,
          label: data?.location_id,
          // location: data.location,
          location_description: data?.location_description,
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
      ...(data?.affectedperson && {
        affectedperson: {
          value: Number(data?.affectedperson_id),
          label: data?.affectedperson,
        },
      }),
      ticketid: data?.ticketid,
      // affectedperson: data?.affectedperson,
      description: data?.description,
      detailsummary: data?.detailsummary,
      asset_description: data?.asset_description,
      // location_description: data?.location_description,
      display_name: data?.display_name,
      glaccount: data?.glaccount,

      service_request_attachment_url: data?.service_request_attachment_url,

      scheduled_start: data?.scheduled_start
        ? moment(data?.scheduled_start).format('YYYY-MM-DDTHH:mm')
        : null,
      targetstart: data?.targetstart
        ? moment(data?.targetstart).format('YYYY-MM-DDTHH:mm')
        : null,
      targetfinish: data?.targetfinish
        ? moment(data?.targetfinish).format('YYYY-MM-DDTHH:mm')
        : null,
      actualstart: data?.actualstart
        ? moment(data?.actualstart).format('YYYY-MM-DDTHH:mm')
        : null,
      actualfinish: data?.actualfinish
        ? moment(data?.actualfinish).format('YYYY-MM-DDTHH:mm')
        : null,
      reporteddate: data?.reporteddate
        ? moment(data?.reporteddate).format('YYYY-MM-DDTHH:mm')
        : moment().format("YYYY-MM-DDTHH:mm"),
      affecteddate: data?.affecteddate
        ? moment(data?.affecteddate).format('YYYY-MM-DDTHH:mm')
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
  }, [getServiceRequestService.data])

  const serviceRequestDetailData = useSelector(
    (state) => state.serviceRequest.serviceRequestDetailData
  )

  const selectedServiceReq = useSelector(
    (state) => state.serviceRequest?.selectedServiceRequest
  )


  const { mutate: getServiceReq } = useGetServiceReq()

  useEffect(() => {
    if (!selectedServiceReq) return

    const savedData = localStorage.getItem('serviceRequestDetailData')
    if (savedData) {
      // restore dari localStorage
      dispatch(serviceRequestActions.setServiceRequestDetailData(JSON.parse(savedData)))
      return
    }

    if (!serviceRequestDetailData || serviceRequestDetailData.length === 0) {
      getServiceReq({ id: selectedServiceReq.uuid }, {
        onSuccess: (data) => {
          dispatch(serviceRequestActions.setServiceRequestDetailData(data))
          localStorage.setItem('serviceRequestDetailData', JSON.stringify(data)) // simpan
        },
        onError: (err) => console.error(err),
      })
    }
  }, [selectedServiceReq?.uuid])


  const createServiceRequest = useCreateServiceRequest()
  const updateServiceReq = useUpdateServiceReq()

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
          location_id: values?.location_id?.label,
          // location: values.location_id?.value?.toString || "",
          // location: values?.location_id?.location ?? null,
          // location_description: values?.location_id?.location_description ?? null,
          asset_id: values?.asset_id?.value ?? null,
          assetnum: values?.asset_id?.label ?? null,
          asset_description: values?.asset_description ?? values?.asset_id?.asset_description ?? null,
          reportedby: values?.reportedby?.value ? Number(values.reportedby.value) : null,
          // siteid: values?.asset_id?.site_id ?? null,
          siteid: values.site_id || values?.asset_id?.site || null,
          glaccount: values?.glaccount || null,
          description: values?.description || "",
          status: values?.status?.value ?? null,
          detailsummary: values?.detailsummary || "",
          affectedperson:
            typeof values?.affectedperson === 'object'
              ? (
                values?.affectedperson?.value ??
                values?.affectedperson?.label ??
                null
              )
              : values?.affectedperson ?? null,
          targetstart: values?.targetstart ? moment(values?.targetstart).toISOString(true) : null,
          targetfinish: values?.targetfinish ? moment(values?.targetfinish).toISOString(true) : null,
          actualstart: values?.actualstart ? moment(values?.actualstart).toISOString(true) : null,
          actualfinish: values?.actualfinish ? moment(values?.actualfinish).toISOString(true) : null,
          reportdate: values?.reportdate
            ? moment(values.reportdate).toISOString(true)
            : moment().toISOString(true),
          affecteddate: values?.affecteddate ? moment(values?.affecteddate).toISOString(true) : null,
          is_location_first: values?.is_location_first ?? null,
        };

        let woId
        let fileUploadUrl
        try {
          if (mode === 'Create') {
            const response = await createServiceRequest.mutateAsync({ data: modifiedFormData })
            woId = response?.data?.data?.uuid

            if (!woId) {
              throw new Error('Service Request ID not returned')
            }

            fileUploadUrl = `/servicerequests/${woId}/attachment`
          } else {
            const updateRes = await updateServiceReq.mutateAsync({
              data: {
                ...modifiedFormData,
                uuid: selectedRow.uuid,
              }
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
            text: `Service Request ${messageSuccess}`,
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
    const fileUploadUrl = `/servicerequests/${selectedRow?.uuid}/attachment` // Assuming assetId is available

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

  const deleteServiceRequest = useDeleteServiceRequest()

  const validateEditDelete = async (type = 'edit') => {
    const notifTitle = `Unable to ${type} Service Request`
    return new Promise((resolve) => {
      if (!selectedRow) {
        resolve(false)
        return
      }

      // 1) Jika punya parent -> tidak boleh hapus
      if (selectedRow.reportedby != null) {
        Notification.fire({
          icon: 'error',
          title: notifTitle,
          html: `Service Request has a parent`,
        }).then(() => resolve(false))
        return
      }

      // 2) Jika sudah dibatalkan atau ditutup -> tidak boleh hapus
      if (selectedRow.status === 'CANCEL') {
        Notification.fire({
          icon: 'error',
          title: notifTitle,
          html: `Service Request already cancelled`,
        }).then(() => resolve(false))
        return
      }
      if (selectedRow.status === 'CLOSE') {
        Notification.fire({
          icon: 'error',
          title: notifTitle,
          html: `Service Request already closed`,
        }).then(() => resolve(false))
        return
      }

      // 3) Skenario khusus (opsional): jika status 'REVISED' dan reportedby null
      if (type === 'edit' && selectedRow.status === 'REVISED' && selectedRow.reportedby === null) {
        setDisableEdit(true)
        resolve(true)
        return
      }

      // Default: boleh delete/edit
      resolve(true)
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
      text: `Do you want to delete ${selectedRow.ticketid}?`,
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteServiceRequest.mutateAsync({
            id: selectedRow.uuid, // tetap kirim ticketid via api layer
          })

          await Notification.fire({
            icon: 'success',
            title: 'Success',
            text: `${selectedRow.ticketid} deleted successfully`,
          })

          setSelectedRow(null)
          setTabIndex(0)
          setAction('Read')
        } catch (err) {
          Notification.fire({
            icon: 'error',
            title: 'Error!',
            text: err?.response?.data?.message || 'Delete failed',
          })

          setErrorMessage(err?.response?.data?.message)
        }
      } else {
        setAction('Read')
      }
    })
  }

  const handleDeleteParent = () => {
    Notification.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Do you want to delete ${data?.reportedby ?? '-'} as a Parent of ${data?.ticketid
        }?`,
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const dataWithRemovedParent = {
          ...data,
          reportedby: null,
        }

        await updateServiceReq
          .mutateAsync({
            id: selectedRow.uuid,
            data: dataWithRemovedParent,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Service Request parent deleted successfully.`,
            }).then(() => {
              setSelectedRow({ ...selectedRow, reportedby: null })
              setData({ ...selectedRow, reportedby: null })
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
    url: `/servicerequests/${selectedRow?.uuid}/attachment`,
    config: {
      enabled: false,
    },
  })

  const { handleDownload: downloadFile } = useFileUpload({
    fieldName: 'files',
    uploadUrl: '',
    fetchUrl: `/servicerequest/${selectedRow?.uuid}/attachment`,
    mode,
  })

  const ticketId = useSelector(
    (state) => state.serviceRequest.selectedServiceRequest
  );

  // useEffect(() => {
  //   if (!ticketId) return;
  //   getServiceRequestService.mutate(ticketId);
  // }, [ticketId]);

  useEffect(() => {
    if (mode !== 'Create') {
      getDetailFile.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode !== 'Create' && selectedRow?.uuid) {
      getServReq()
    }
  }, [selectedRow, mode])

  useEffect(() => {
    if (mode === 'Create') return
    setDataFile(getDetailFile.data?.data?.data)
  }, [getDetailFile.data, mode])

  const uploadModalProps = useMemo(
    () => ({
      files: files || [],
      messageError,
      onDrop,
      setFiles,
      mode,
      removeFiles,
      MAX_FILE_SIZE,
      acceptedFileTypes,
      handleDownload,
      setDeletedFiles,
      uploadFiles,
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
      messageError,
      onDrop,
      removeFiles,
      MAX_FILE_SIZE,
      acceptedFileTypes,
      setFiles,
      handleDownload,
      setDeletedFiles,
      tempFiles,
      uploadFiles,
      setTempFiles,
      isModalOpen,
      setIsModalOpen,
      handleModalClose,
      handleFileSelect,
      duplicateFileError,
      mode,
    ],
  )

  return {
    data,
    isLoading,
    errorMessage,
    formValue,
    selectedRow,
    serviceRequestDetailData,
    setSelectedRow,
    handleSubmit,
    downloadFile,
    // getWorkTypes,
    // getWorkPriorities,
    // getWorkClassifications,
    getLocations,
    getAssets,
    getAssetsLoc,
    setAssetParams,
    assetOptions,
    getUserSite,
    getReportBy,
    getUserLogin,
    isUploadSummaryModalOpen,
    uploadSummary,
    setIsUploadSummaryModalOpen,
    handleRetryUpload,
    handleOK,
    // getUsers,
    getSites,
    // getConfig,
    // getFailureCodes,
    // getHazardGroup,
    getWorkOrders,
    work_order_statuses,
    disableEdit,
    // getJobPlanList,
    // getPMList,
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
    uploadFiles,
    dataFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
    files,
    isNewFiles,
  }
}

export default useServiceReq
