import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useLocation as useLocationRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  useCreatePreventiveMaintenance,
  useGetAssetDropdown,
  useGetDetailPreventiveMaintenance,
  useGetJobPlanDropdown,
  useGetLocationDropdown,
  useUpdatePreventiveMaintenance,
} from '../services'
import moment from 'moment'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'

const usePreventiveMaintenanceForm = ({ mode, setAction, setTabIndex }) => {
  const location = useLocationRouter()
  const Notification = withReactContent(Swal)
  const auth = useSelector((state) => state.auth?.user)
  const selectedRow = useSelector(
    (state) => state.preventiveMaintenances?.selectedPreventiveMaintenance,
  )

  const fieldName = 'files'
  const { uploadUrl, fetchUrl } = useMemo(() => {
    if (mode === 'Update' && selectedRow?.preventive_maintenance_id) {
      const pmId = selectedRow.preventive_maintenance_id
      return {
        uploadUrl: `/preventive-maintenance/${pmId}/attachment`,
        fetchUrl: `/preventive-maintenance/${pmId}/attachment`,
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
    deletePendingFiles,
    deletedFiles,
  } = useFileUpload(fileUploadProps)

  // Track deleted files in component state
  const [formDeletedFiles, setFormDeletedFiles] = useState([])

  // Update formDeletedFiles when deletedFiles changes
  useEffect(() => {
    setFormDeletedFiles(deletedFiles)
  }, [deletedFiles])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formValue, setFormValue] = useState({
    site_id: auth?.site_id !== null ? { value: auth?.site_id, label: auth?.site } : null,
    organization_id:
      auth?.organization_id !== null
        ? { value: auth?.organization_id, label: auth?.organization_name }
        : null,
    status: null,
    asset_id: null,
    attachment: '',
    job_plan_id: null,
    preventive_maintenance_name: '',
    preventive_maintenance_description: '',
    location_id: null,
    last_completion_date: '',
    earliest_next_date: '',
    gl_account: '',
    gl_account_desc: '',
    storeroom_site: null,
    storeroom_desc: '',
  })

  const statusWorkType = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ]

  const createPreventiveMaintenance = useCreatePreventiveMaintenance()
  const updatePreventiveMaintenance = useUpdatePreventiveMaintenance()

  const getLocationDropdown = useGetLocationDropdown()
  const getAssetDropdown = useGetAssetDropdown()
  const getJobPlanDropdown = useGetJobPlanDropdown()

  const getPreventiveMaintenance = useGetDetailPreventiveMaintenance({
    id: selectedRow?.preventive_maintenance_id,
    config: {
      enabled: false,
    },
  })

  useEffect(() => {
    if (mode !== 'Create') {
      getPreventiveMaintenance.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode === 'Create') return

    const dataPM = getPreventiveMaintenance?.data?.data?.data

    setFormValue((prev) => ({
      ...prev,
      site_id: {
        value: dataPM?.site_id,
        label: dataPM?.site,
        description: dataPM?.site_description,
      },
      organization_id: {
        value: dataPM?.organization_id,
        label: dataPM?.organization,
        description: dataPM?.organization_description,
      },
      status: {
        value: dataPM?.status,
        label: dataPM?.status,
      },
      asset_id: {
        value: dataPM?.asset_id,
        label: dataPM?.asset_num,
        description: dataPM?.asset_description,
      },
      job_plan_id: {
        value: dataPM?.job_plan_id,
        label: dataPM?.plan_name,
        description: dataPM?.plan_description,
      },
      last_completion_date: moment(dataPM?.last_completion_date).format('YYYY-MM-DDTHH:mm'),
      gl_account: dataPM?.gl_account,
      gl_account_desc: dataPM?.gl_account_desc,
      storeroom_site: dataPM?.storeroom_site,
      storeroom_desc: dataPM?.storeroom_desc,
      preventive_maintenance_name: dataPM?.preventive_maintenance_name,
      preventive_maintenance_description: dataPM?.preventive_maintenance_description,
      location_id: {
        value: dataPM?.location_id,
        label: dataPM?.location,
        description: dataPM?.location_description,
      },
      attachment: dataPM?.attachment,
      earliest_next_date: moment(dataPM?.earliest_next_date).format('YYYY-MM-DDTHH:mm'),
      last_start_date: moment(dataPM?.last_start_date).format('YYYY-MM-DDTHH:mm'),
      work_order_status: dataPM?.work_order_status,
      is_active: dataPM?.is_active,
    }))
  }, [getPreventiveMaintenance.data, mode])

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
        const newValues = {
          site_id: values.site_id?.value,
          organization_id: values.organization_id?.value,
          status: values.status?.value,
          asset_id: values.asset_id?.value,
          job_plan_id: values.job_plan_id?.value,
          gl_account: values.gl_account,
          gl_account_desc: values.gl_account_desc,
          storeroom_site: values.storeroom_site,
          storeroom_desc: values.storeroom_desc,
          preventive_maintenance_name: values.preventive_maintenance_name,
          preventive_maintenance_description: values.preventive_maintenance_description,
          location_id: values.location_id?.value,
        }

        try {
          let preventiveMaintenanceId
          let fileUploadUrl

          // First handle the main form submission
          if (mode === 'Create') {
            const response = await createPreventiveMaintenance.mutateAsync({ data: newValues })
            preventiveMaintenanceId = response?.data?.data?.preventive_maintenance_id

            if (!preventiveMaintenanceId) {
              throw new Error('Preventive Maintenance ID not returned')
            }

            fileUploadUrl = `/preventive-maintenance/${preventiveMaintenanceId}/attachment`
          } else {
            const updateRes = await updatePreventiveMaintenance.mutateAsync({
              id: selectedRow?.preventive_maintenance_id,
              data: {
                ...newValues,
                last_start_date: moment(values.last_start_date).format('YYYY-MM-DDTHH:mm:ssZ'),
                is_active: values.is_active,
              },
            })

            preventiveMaintenanceId = selectedRow?.preventive_maintenance_id
            fileUploadUrl = uploadUrl // Use existing URL for update mode

            if (!preventiveMaintenanceId || !updateRes) {
              throw new Error('Update failed or missing ID')
            }
          }

          // Handle file operations
          if (mode === 'Update' && deletedFiles?.length > 0) {
            await deletePendingFiles()
          }

          // Upload files with the correct URL
          if (files?.length > 0 && preventiveMaintenanceId) {
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
            text: 'Preventive Maintenance saved successfully',
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

  return {
    auth,
    isModalOpen,
    setIsModalOpen,
    statusWorkType,
    formValue,
    handleSubmit,
    getLocationDropdown,
    getAssetDropdown,
    getJobPlanDropdown,
    fieldName,
    uploadUrl,
    fetchUrl,
    formDeletedFiles,
    uploadModalProps,
  }
}

export default usePreventiveMaintenanceForm
