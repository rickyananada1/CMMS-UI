import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation as useLocationRouter } from 'react-router-dom'
import { useGetAllOrganizations, useSiteOrganizationDropdown } from '../services/jobPlanRequirement'
import { useCreateJobPlan, useUpdateJobPlan, useGetDetailJobPlan } from '../services'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'

const useJobPlan = ({ mode, setAction, setTabIndex }) => {
  const location = useLocationRouter()
  const Notification = withReactContent(Swal)

  const auth = useSelector((state) => state.auth?.user)
  const selectedRow = useSelector((state) => state.jobPlan?.selectedJobPlan)

  const fieldName = 'files'
  const { uploadUrl, fetchUrl } = useMemo(() => {
    if (mode === 'Update' && selectedRow?.job_plan_id) {
      const jpId = selectedRow.job_plan_id
      return {
        uploadUrl: `/planning/job-planning/${jpId}/attachment`,
        fetchUrl: `/planning/job-planning/${jpId}/attachment`,
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

  const [formDeletedFiles, setFormDeletedFiles] = useState([])

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
    plan_name: '',
    plan_description: '',
    status: '',
  })

  const status = [
    { label: 'Active', value: 'Active' },
    { label: 'InActive', value: 'InActive' },
  ]

  const getOrganizationDropdown = useGetAllOrganizations()
  const getSiteOrganizationDropdown = useSiteOrganizationDropdown()

  const createJobPlan = useCreateJobPlan()
  const updateJobPlan = useUpdateJobPlan()

  const getJobPlan = useGetDetailJobPlan({
    id: selectedRow?.job_plan_id,
    config: {
      enabled: false,
    },
  })

  useEffect(() => {
    if (mode !== 'Create') {
      getJobPlan.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  const dataJobPlan = getJobPlan?.data?.data?.data

  useEffect(() => {
    if (mode === 'Create') {
      setFormValue((prev) => ({
        ...prev,
        site_id:
          auth?.site_id !== null
            ? { value: auth?.site_id, label: `${auth?.site_description}` }
            : null,
        organization_id:
          auth?.organization_id !== null
            ? { value: auth?.organization_id, label: `${auth?.organization_name}` }
            : null,
      }))
    } else {
      setFormValue((prev) => ({
        ...prev,
        site_id: {
          value: Number(dataJobPlan?.site_id),
          label: dataJobPlan?.site,
        },
        organization_id: {
          value: Number(dataJobPlan?.organization_id),
          label: dataJobPlan?.organization,
        },
        plan_name: dataJobPlan?.job_plan,
        plan_description: dataJobPlan?.plan_description,
        status: status.find((item) => item.value === dataJobPlan?.status),
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getJobPlan.data, mode])

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
          site_id: `${values.site_id.value}`,
          organization_id: `${values.organization_id.value}`,
          plan_name: values.plan_name,
          plan_description: values.plan_description,
          status: values.status.value,
          attachment: values.attachment,
          ...(mode === 'Duplicate' && { duplicate_job_plan_id: String(dataJobPlan?.job_plan_id) }),
        }

        try {
          let jobPlanId
          let fileUploadUrl

          if (mode === 'Create' || mode === 'Duplicate') {
            const response = await createJobPlan.mutateAsync({ data: newValues })
            jobPlanId = response?.data?.data?.job_plan_id

            if (!jobPlanId) {
              throw new Error('Job Plan ID not returned')
            }

            fileUploadUrl = `/planning/job-planning/${jobPlanId}/attachment`
          } else {
            const updateRes = await updateJobPlan.mutateAsync({
              id: selectedRow?.job_plan_id,
              data: newValues,
            })

            jobPlanId = selectedRow?.job_plan_id
            fileUploadUrl = uploadUrl

            if (!updateRes || !jobPlanId) {
              throw new Error('Update failed or missing ID')
            }
          }

          if (mode === 'Update' && deletedFiles?.length > 0) {
            await deletePendingFiles()
          }

          if (files?.length > 0 && jobPlanId) {
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
            text: 'Job Plan saved successfully',
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
    status,
    formValue,
    handleSubmit,
    handleDownload,
    dataJobPlan,
    getOrganizationDropdown,
    getSiteOrganizationDropdown,
    isModalOpen,
    setIsModalOpen,
    fieldName,
    uploadUrl,
    fetchUrl,
    formDeletedFiles,
    uploadModalProps,
  }
}

export default useJobPlan
