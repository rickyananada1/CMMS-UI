import { useEffect, useMemo, useState } from 'react'
import {
  useCreateConditionMonitoring,
  useDetailCM,
  useGetAssetDropdown,
  useGetJobPlanDropdown,
  useGetLocationDropdown,
  useGetMeterDropdown,
  useGetPMDropdown,
  useSiteDropdown,
  useUpdateConditionMonitoring,
} from '../services'
import { useSelector } from 'react-redux'
import { useLocation as useLocationRouter } from 'react-router-dom'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'

const useConditionMonitoringForm = ({ mode, setAction, setTabIndex }) => {
  const location = useLocationRouter()
  const Notification = withReactContent(Swal)

  const fieldName = 'files'
  const auth = useSelector((state) => state.auth?.user)
  const selectedRow = useSelector((state) => state.conditionMonitoring?.selectedConditionMonitoring)
  const { uploadUrl, fetchUrl } = useMemo(() => {
    if (mode === 'Update' && selectedRow?.condition_monitoring_id) {
      const cmId = selectedRow.condition_monitoring_id
      return {
        uploadUrl: `/asset/condition-monitoring/${cmId}/attachment`,
        fetchUrl: `/asset/condition-monitoring/${cmId}/attachment`,
      }
    }

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
  const [historyCM, setHistoryCM] = useState([])
  const [formValue, setFormValue] = useState({
    data: {
      condition_monitoring: {
        point_num: '',
        point_description: '',
        meter_id: null,
        meter_type: '',
        site_id: null,
        asset_id: null,
        location_id: null,
        attachment: '',
      },
      measure_point: {
        upper_warning_limit: 0,
        upper_action_limit: 0,
        upper_limit_pm: 0,
        upper_limit_pm_description: '',
        upper_limit_job_plan: '',
        upper_limit_job_plan_description: '',
        upper_limit_priority: 0,
        lower_warning_limit: 0,
        lower_action_limit: 0,
        lower_limit_pm: 0,
        lower_limit_pm_description: '',
        lower_limit_job_plan: '',
        lower_limit_job_plan_description: '',
        lower_limit_priority: 0,
      },
      characteristic_action_values: [
        {
          ca_value: '',
          pm: '',
          job_plan_id: null,
          priority: 0,
        },
      ],
    },
  })

  const getLocationDropdown = useGetLocationDropdown()
  const getAssetDropdown = useGetAssetDropdown()
  const getMeterDropdown = useGetMeterDropdown()
  const getSiteDropdown = useSiteDropdown({
    id: auth?.organization_id,
  })
  const getJobPlanDropdown = useGetJobPlanDropdown()
  const getPMDropdown = useGetPMDropdown()

  const getConditionMonitoring = useDetailCM({
    id: selectedRow?.condition_monitoring_id,
    config: {
      enabled: false,
    },
  })
  const createConditionMonitoring = useCreateConditionMonitoring()
  const updateConditionMonitoring = useUpdateConditionMonitoring()

  useEffect(() => {
    if (mode !== 'Create') {
      getConditionMonitoring.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode !== 'Create') {
      const dataCM = getConditionMonitoring?.data?.data?.data
      setFormValue((prev) => ({
        ...prev,
        data: {
          condition_monitoring: {
            point_num: dataCM?.condition_monitoring_detail?.point_num,
            point_description: dataCM?.condition_monitoring_detail?.point_description,
            meter_id: {
              value: dataCM?.condition_monitoring_detail?.meter_id,
              label: dataCM?.condition_monitoring_detail?.meter_name,
              description: dataCM?.condition_monitoring_detail?.meter_description,
              meter_type: dataCM?.condition_monitoring_detail?.meter_type,
              uom: dataCM?.condition_monitoring_detail?.uom_name,
            },
            site_id: {
              value: dataCM?.condition_monitoring_detail?.site_id,
              label: dataCM?.condition_monitoring_detail?.site,
            },
            asset_id: dataCM?.condition_monitoring_detail?.asset_id
              ? {
                  value: dataCM?.condition_monitoring_detail?.asset_id,
                  label: dataCM?.condition_monitoring_detail?.asset_num,
                  description: dataCM?.condition_monitoring_detail?.asset_description,
                }
              : null,
            location_id: dataCM?.condition_monitoring_detail?.location_id
              ? {
                  value: dataCM?.condition_monitoring_detail?.location_id,
                  label: dataCM?.condition_monitoring_detail?.location,
                  description: dataCM?.condition_monitoring_detail?.location_description,
                }
              : null,
            attachment: dataCM?.condition_monitoring_detail?.attachment,
          },
          measure_point: {
            upper_warning_limit: dataCM?.limit_point_data?.upper_warning_limit,
            upper_action_limit: dataCM?.limit_point_data?.upper_action_limit,
            upper_limit_pm: dataCM?.limit_point_data?.upper_pm_name
              ? {
                  value: dataCM?.limit_point_data?.upper_limit_pm,
                  label: dataCM?.limit_point_data?.upper_pm_name,
                  description: dataCM?.limit_point_data?.upper_limit_pm_description,
                }
              : null,
            upper_limit_pm_description: dataCM?.limit_point_data?.upper_limit_pm_description,
            upper_limit_job_plan: {
              value: dataCM?.limit_point_data?.upper_limit_job_plan,
              label: dataCM?.limit_point_data?.upper_plan_name,
              plan_description: dataCM?.limit_point_data?.upper_limit_job_plan_description,
              pm: dataCM?.limit_point_data?.upper_pm_name !== '',
            },
            upper_limit_job_plan_description:
              dataCM?.limit_point_data?.upper_limit_job_plan_description,
            upper_limit_priority: dataCM?.limit_point_data?.upper_limit_priority,
            lower_warning_limit: dataCM?.limit_point_data?.lower_warning_limit,
            lower_action_limit: dataCM?.limit_point_data?.lower_action_limit,
            lower_limit_pm: dataCM?.limit_point_data?.lower_pm_name
              ? {
                  value: dataCM?.limit_point_data?.lower_limit_pm,
                  label: dataCM?.limit_point_data?.lower_pm_name,
                  description: dataCM?.limit_point_data?.lower_limit_pm_description,
                }
              : null,
            lower_limit_pm_description: dataCM?.limit_point_data?.lower_limit_pm_description,
            lower_limit_job_plan: {
              value: dataCM?.limit_point_data?.lower_limit_job_plan,
              label: dataCM?.limit_point_data?.lower_plan_name,
              plan_description: dataCM?.limit_point_data?.lower_limit_job_plan_description,
              pm: dataCM?.limit_point_data?.lower_pm_name !== '',
            },
            lower_limit_job_plan_description:
              dataCM?.limit_point_data?.lower_limit_job_plan_description,
            lower_limit_priority: dataCM?.limit_point_data?.lower_limit_priority,
          },
          characteristic_action_values: dataCM?.characteristic_action_values?.map((res) => {
            return {
              id: res.id,
              ca_value: res.value,
              pm:
                res.pm !== '0'
                  ? {
                      label: res.pm_name,
                      value: res.pm,
                      job_plan_id: res.job_plan,
                      plan_name: res.job_plan_name,
                    }
                  : null,
              job_plan_id: {
                label: res.job_plan_name,
                value: res.job_plan,
                pm: res.pm !== '0',
              },
              priority: res.priority,
            }
          }),
        },
      }))
      setHistoryCM(dataCM?.history)
    } else {
      setFormValue(() => ({
        data: {
          condition_monitoring: {
            point_num: '',
            point_description: '',
            meter_id: null,
            meter_type: null,
            site_id:
              auth?.site_id !== null
                ? {
                    value: auth?.site_id,
                    label: auth?.site,
                  }
                : null,
            asset_id: null,
            location_id: null,
            attachment: '',
          },
          measure_point: {
            upper_warning_limit: 0,
            upper_action_limit: 0,
            upper_limit_pm: 0,
            upper_limit_pm_description: '',
            upper_limit_job_plan: '',
            upper_limit_job_plan_description: '',
            upper_limit_priority: 0,
            lower_warning_limit: 0,
            lower_action_limit: 0,
            lower_limit_pm: 0,
            lower_limit_pm_description: '',
            lower_limit_job_plan: '',
            lower_limit_job_plan_description: '',
            lower_limit_priority: 0,
          },
          characteristic_action_values: [
            {
              ca_value: '',
              pm: null,
              job_plan: null,
              priority: 0,
            },
          ],
        },
      }))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getConditionMonitoring.data, mode])

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
          data: {
            condition_monitoring: {
              point_num: values.data.condition_monitoring.point_num,
              point_description: values.data.condition_monitoring.point_description,
              meter_id: values.data.condition_monitoring.meter_id.value,
              site_id: values.data.condition_monitoring.site_id.value,
              asset_id: values.data.condition_monitoring.asset_id?.value || null,
              location_id: values.data.condition_monitoring.location_id?.value || null,
            },
            measure_point: {
              upper_warning_limit: values.data.measure_point.upper_warning_limit,
              upper_action_limit: values.data.measure_point.upper_action_limit,
              upper_limit_pm: values.data.measure_point.upper_limit_pm?.value || 0.0,
              upper_limit_pm_description: values.data.measure_point.upper_limit_pm?.description,
              upper_limit_job_plan: String(values.data.measure_point.upper_limit_job_plan?.value),
              upper_limit_job_plan_description:
                values.data.measure_point.upper_limit_job_plan?.plan_description,
              upper_limit_priority: values.data.measure_point.upper_limit_priority,
              lower_warning_limit: values.data.measure_point.lower_warning_limit,
              lower_action_limit: values.data.measure_point.lower_action_limit,
              lower_limit_pm: values.data.measure_point.lower_limit_pm?.value || 0.0,
              lower_limit_pm_description: values.data.measure_point.lower_limit_pm?.description,
              lower_limit_job_plan: String(values.data.measure_point.lower_limit_job_plan?.value),
              lower_limit_job_plan_description:
                values.data.measure_point.lower_limit_job_plan?.plan_description,
              lower_limit_priority: values.data.measure_point.lower_limit_priority,
            },
            characteristic_action_values: values.data.characteristic_action_values
              ? values.data.characteristic_action_values.map((res) => {
                  const baseObject = {
                    value: res.ca_value,
                    job_plan: String(res.job_plan_id?.value || res.pm?.job_plan_id || 0.0),
                    pm: String(res.pm?.value || 0.0),
                    priority: res.priority,
                  }
                  return mode === 'Update' ? { id: res.id, ...baseObject } : baseObject
                })
              : null,
          },
        }

        const meter_type = values.data.condition_monitoring.meter_id?.meter_type
        if (meter_type !== 'characteristic') {
          newValues.data.characteristic_action_values = null
        } else {
          newValues.data.measure_point = null
        }

        try {
          let conditionMonitoringId
          let fileUploadUrl

          // --- Create or Update
          if (mode === 'Create') {
            const response = await createConditionMonitoring.mutateAsync({ data: newValues })
            conditionMonitoringId = response?.data?.data?.condition_monitoring_id

            if (!conditionMonitoringId) {
              throw new Error('Condition Monitoring ID not returned')
            }

            fileUploadUrl = `/asset/condition-monitoring/${conditionMonitoringId}/attachment`
          } else {
            const updateRes = await updateConditionMonitoring.mutateAsync({
              id: selectedRow?.condition_monitoring_id,
              data: newValues,
            })

            conditionMonitoringId = selectedRow?.condition_monitoring_id
            fileUploadUrl = uploadUrl

            if (!updateRes || !conditionMonitoringId) {
              throw new Error('Update failed or missing ID')
            }
          }

          // --- Delete Files if any
          if (mode === 'Update' && deletedFiles?.length > 0) {
            await deletePendingFiles()
          }

          // --- Upload Files with error catch
          if (files?.length > 0 && conditionMonitoringId) {
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

          // --- Notify Success
          Notification.fire({
            icon: 'success',
            title: 'Success',
            text: 'Condition Monitoring saved successfully',
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
            text: error?.response?.data?.message || error.message || 'Something went wrong!',
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

  const isDisabled = historyCM?.length > 0

  return {
    formValue,
    isDisabled,
    handleSubmit,
    handleDownload,
    getLocationDropdown,
    getAssetDropdown,
    getMeterDropdown,
    getSiteDropdown,
    getJobPlanDropdown,
    getPMDropdown,
    isModalOpen,
    setIsModalOpen,
    fieldName,
    uploadUrl,
    fetchUrl,
    formDeletedFiles,
    uploadModalProps,
  }
}

export default useConditionMonitoringForm
