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
  useGetServiceReqTypes,
  // useAssetDropdown,
  useGetAssets,
  // useConfigurationDropdown,
  useGetSites,
  useGetUser,
  useGetServiceReqs,
  useGetUserSites,
  useGetReportBy,
  getWoServiceRequests,
  useGetProfile,
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
    console.error(`Unknown service request status: ${currentStatus}`);
    return;
  }
  work_order_statuses.length = 0;
  work_order_statuses.push({ value: currentStatus, label: currentStatus });
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
  console.log(oke, 'sssssiteid');
  const repId = {
    user_id: useSelector((state) => state.auth?.user?.user_id),
    reportedby: useSelector((state) => state.auth?.user?.display_name),
  }
  const userSite = {
    site_id: useSelector((state) => state.auth?.user?.site_id),
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataFile, setDataFile] = useState([])
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

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
    location: "",             // string
    location_description: "", // textarea

    // ASSET
    asset_id: null,           // select
    asset_num: "",             // string
    asset_description: "",    // textarea

    // SITE
    site_id:
      userSite?.site_id !== null
        ? {
          value: userSite?.site_id,
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

  // const getWorkTypes = useGetServiceReqTypes()
  // const getWorkPriorities = useGetWorkPriorities()
  // const getWorkClassifications = useGetWorkClassifications()
  const getLocations = useGetListLocation()
  const getAssets = useGetAssets()
  const getUserSite = useGetUserSites({ siteid: siteid })
  const affectedperson = {
    user_id: useSelector((state) => state.auth?.user?.user_id),
    reportedby: useSelector((state) => state.auth?.user?.display_name),
  }
  const getUserLogin = useGetServiceReqs()
  const getReportBy = useGetReportBy()
  // const getConfig = useConfigurationDropdown()
  // const getUsers = useGetUser()
  // console.log(getUsers, 'getUsers')
  const getSites = useGetSites({ org_id: userOrgId })
  // const getFailureCodes = useGetFailureCodes()
  // const getHazardGroup = useGetHazardGroup()
  const getWorkOrders = useGetServiceReqs()
  // const getJobPlanList = useGetJobPlanDropdown()
  // const getPMList = useGetPreventiveMaintenanceDropdown()

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
          console.log(res.data, 'resdata');
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

  useEffect(() => {
    if (!getServiceRequestService.data?.data?.data) return
    const data = getServiceRequestService.data.data.data
    setOldStatus(data?.status)
    updateWorkOrderStatuses(data?.status)
    const row = data[0];
    console.log("RAW DATA = ", getServiceRequestService.data?.data?.data);
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
      ...(data?.site_id !== null && {
        siteid: {
          value: data?.siteid,
          label: data?.site,
          site_code: data.site
        },
      }),
      ...(data?.status !== null && {
        status: {
          value: data?.status,
          label: data?.status,
        },
      }),
      ...(data?.affectedperson !== null && {
        affectedperson: {
          user_id: data?.user_id,
          display_name: data?.display_name,
        },
      }),
      ticketid: data?.ticketid,
      // affectedperson: data?.affectedperson,
      description: data?.description,
      detailsummary: data?.detailsummary,
      asset_description: data?.asset_description,
      location_description: data?.location_description,
      display_name: data?.display_name,
      glaccount: data?.glaccount,

      service_request_attachment_url: data?.service_request_attachment_url,

      scheduled_start: data?.scheduled_start
        ? moment(data?.scheduled_start).format('YYYY-MM-DD')
        : null,
      targetstart: data?.targetstart
        ? moment(data?.targetstart).format('YYYY-MM-DD')
        : null,
      targetfinish: data?.targetfinish
        ? moment(data?.targetfinish).format('YYYY-MM-DD')
        : null,
      actualstart: data?.actualstart
        ? moment(data?.actualstart).format('YYYY-MM-DD')
        : null,
      actualfinish: data?.actualfinish
        ? moment(data?.actualfinish).format('YYYY-MM-DD')
        : null,
      reporteddate: data?.reporteddate
        ? moment(data?.reporteddate).format('YYYY-MM-DD')
        : null,
      affecteddate: data?.affecteddate
        ? moment(data?.affecteddate).format('YYYY-MM-DD')
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

  const createServiceRequest = useCreateServiceRequest()
  const updateServiceReq = useUpdateServiceReq()

  const handleSubmit = async (values, formikHelpers) => {
    console.log('reportedby:', values.reportedby)
    console.log('affectedperson:', values.affectedperson)
    console.log('affectedperson.user_id:', values.affectedperson?.user_id)
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
          reportedby: values?.reportedby?.value ? Number(values.reportedby.value) : null,
          // siteid: values?.site_id?.label ?? null,
          glaccount: values?.glaccount || null,
          description: values?.description || "",
          status: values?.status?.value ?? null,
          detailsummary: values?.detailsummary || "",
          affectedperson: values?.affectedperson?.value ?? null,
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

        // const modifiedFormData = {
        //   ...values,
        //   location_id: values?.location_id?.value ?? null,
        //   assetnum: values?.asset_id?.label ?? null,
        //   asset_id: values?.asset_id?.value ?? null,
        //   // reportedby: values?.reportedby?.label
        //   //   || values?.reportedby?.display_name
        //   //   || values?.reportedby
        //   //   || null,
        //   // reportedby: values?.reportedby?.value
        //   //   ? Number(values.reportedby.value)
        //   //   : null,
        //   // reportedby: values.reportedby ? Number(values.reportedby) : null,
        //   reportedby: values?.reportedby || null,
        //   siteid: values?.site_id?.label,
        //   glaccount: values?.glaccount,
        //   description: values?.description,
        //   status: values?.status?.value,
        //   asset_description: values?.asset_description,
        //   location: values?.location_id?.location ?? null,
        //   location_description: values?.location_id?.location_description ?? null,
        //   detailsummary: values?.detailsummary,
        //   // display_name: values.reportedby?.label ?? '',
        //   // affectedperson: values?.user_id?.label ?? '',
        //   // affectedperson: values?.user_id?.value
        //   //   ? Number(values.user_id.value)
        //   //   : null,
        //   affectedperson: values?.user_id?.value ?? null,
        //   targetstart: values?.target_start
        //     ? moment(values?.target_start).toISOString(true)
        //     : null,
        //   targetfinish: values?.target_finish
        //     ? moment(values?.target_finish).toISOString(true)
        //     : null,
        //   actualstart: values?.actualstart
        //     ? moment(values?.actualstart).toISOString(true)
        //     : null,
        //   actualfinish: values?.actualfinish
        //     ? moment(values?.actualfinish).toISOString(true)
        //     : null,
        //   reporteddate: values?.reporteddate
        //     ? moment(values?.reporteddate).toISOString(true)
        //     : null,
        //   affecteddate: values?.affected_date
        //     ? moment(values?.affected_date).toISOString(true)
        //     : null,
        //   is_location_first: values?.is_location_first,
        // }

        console.log("Submit payload:", modifiedFormData);

        try {
          let woId
          let fileUploadUrl

          if (mode === 'Create') {
            const response = await createServiceRequest.mutateAsync({ data: modifiedFormData })
            woId = response?.data?.data?.uuid
            const responseAssetnum = response?.data?.data?.assetnum

            if (!woId) {
              throw new Error('Service Request ID not returned')
            }

            if (responseAssetnum) {
              console.log('✅ Asset Number (assetnum) tersimpan:', responseAssetnum)
              console.log(`   yang dikirim: ${modifiedFormData.assetnum}`)
              console.log(`   dari backend: ${responseAssetnum}`)
            } else {
              console.warn('⚠️ WARNING: Asset number tidak dikembalikan dari backend')
              if (modifiedFormData.assetnum) {
                console.warn(`   Expected: ${modifiedFormData.assetnum}`)
              }
            }

            fileUploadUrl = `/servicerequests/${woId}/attachment`
          } else {
            const updateRes = await updateServiceReq.mutateAsync({
              data: {
                ...modifiedFormData,
                ticketid: selectedRow.uuid,
              }
            })
            const responseAssetnum = updateRes?.data?.data?.assetnum

            woId = selectedRow?.uuid
            fileUploadUrl = uploadUrl // Use existing URL for update mode

            if (!updateRes || !woId) {
              throw new Error('Update failed or missing ID')
            }

            if (responseAssetnum) {
              console.log('✅ Asset Number (assetnum) terupdate:', responseAssetnum)
              console.log(`   yang dikirim: ${modifiedFormData.assetnum}`)
              console.log(`   dari backend: ${responseAssetnum}`)
            } else {
              console.warn('⚠️ WARNING: Asset number tidak dikembalikan dari backend')
              if (modifiedFormData.assetnum) {
                console.warn(`   Expected: ${modifiedFormData.assetnum}`)
              }
            }
          }

          // Handle file operations
          if (mode === 'Update' && deletedFiles?.length > 0) {
            await deletePendingFiles()
          }

          // Upload files with the correct URL
          // if (files?.length > 0 && woId) {
          //   try {
          //     await uploadFiles(files, fileUploadUrl)
          //   } catch (err) {
          //     // Handle Nginx 413 or general upload error
          //     const status = err?.response?.status
          //     if (status === 413) {
          //       throw new Error('Upload failed: File size exceeds server limit (Nginx)')
          //     }
          //     throw new Error('Upload failed: ' + (err.message || 'Unknown error'))
          //   }
          // }
          if (files?.length > 0 && woId) {
            // Filter file yang terlalu besar (misal > 20MB)
            const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024
            const validFiles = files.filter(file => {
              if (!file.size) return false; // skip jika size undefined/null
              const size = typeof file.size === 'string' ? Number(file.size) : file.size;
              return size <= MAX_FILE_SIZE;
            });
            if (validFiles.length === 0) {
              Notification.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: `All selected files exceed the maximum size of ${MAX_FILE_SIZE / (1024 * 1024 * 1024)} GB`,
              })
              return
            }

            try {
              await uploadFiles(validFiles, fileUploadUrl)
            } catch (err) {
              const status = err?.response?.status

              if (status === 413) {
                throw new Error(
                  'Upload failed: File size exceeds server limit (Nginx). Please upload smaller files.'
                )
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

  const deleteServiceRequest = useDeleteServiceRequest()

  const validateEditDelete = async (type = 'edit') => {
    console.log('DEBUG validateEditDelete selectedRow:', selectedRow)
    console.log('DEBUG validateEditDelete status:', selectedRow?.status, 'reportedby:', selectedRow?.reportedby)
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
            text: `${selectedRow.uuid} deleted successfully`,
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

  // useEffect(() => {
  //   if (mode !== 'Create') {
  //     getDetailFile.refetch()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location.pathname, mode])

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

  return {
    data,
    isLoading,
    errorMessage,
    formValue,
    selectedRow,
    setSelectedRow,
    handleSubmit,
    downloadFile,
    // getWorkTypes,
    // getWorkPriorities,
    // getWorkClassifications,
    getLocations,
    getAssets,
    getUserSite,
    getReportBy,
    getUserLogin,
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
    dataFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  }
}

export default useServiceReq
