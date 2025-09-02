import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation as useLocationRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  useCreateJobPlanTask,
  useUpdateJobPlanTask,
  useGetLocationDropdown,
  useGetAssetDropdown,
  useGetDetailJobPlanTask,
} from '../services'
import moment from 'moment'
import { getTableLastCurrentParams } from 'src/utils/base'

const useJobPlanTaskForm = ({ mode, setAction, setTabIndex }) => {
  const location = useLocationRouter()
  const Notification = withReactContent(Swal)

  const selectedRow = useSelector((state) => state.jobPlan?.selectedJobPlan)
  const selectedTaskRow = useSelector((state) => state.jobPlan?.selectedTask)

  const [formValue, setFormValue] = useState({
    job_plan_task: [
      {
        sequence: null,
        task: '',
        description: '',
        status: null,
        location_id: null,
        location_description: '',
        asset_id: null,
        asset_description: '',
        inspector: '',
        measurement_point: '',
        measurement_value: '',
        measurement_date: null,
        target_start: null,
        target_finish: null,
        scheduled_start: null,
        scheduled_finish: null,
        start_no_earlier_than: null,
        finish_no_later_than: null,
        actual_start: null,
        actual_finish: null,
        duration_in_minute: null,
      },
    ],
  })

  const status = [
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

  const getAssetDropdown = useGetAssetDropdown()
  const getLocationDropdown = useGetLocationDropdown()

  const paramsFromStorage = getTableLastCurrentParams(location.pathname, 'jobplan-task')
  const currentPage = paramsFromStorage.currentPage

  const getJobPlanTaskDetail = useGetDetailJobPlanTask({
    id: selectedRow?.job_plan_id,
    params: {
      page: currentPage,
      limit: 10,
    },
    config: {
      enabled: false,
    },
  })

  useEffect(() => {
    if (mode !== 'CreateJobPlanTask') getJobPlanTaskDetail.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode === 'CreateJobPlanTask') return

    const dataTask = getJobPlanTaskDetail?.data?.data?.data
    const result = dataTask?.find(
      (task) => task.work_order_task_id === selectedTaskRow?.work_order_task_id,
    )

    setFormValue((prev) => ({
      ...prev,
      job_plan_task: [
        {
          work_order_task_id: result?.work_order_task_id,
          work_order_id: result?.work_order_id,
          sequence: result?.sequence,
          task: result?.task,
          description: result?.summary,
          status: {
            value: result?.status,
            label: result?.status,
          },
          location_id: {
            value: result?.location_id,
            label: result?.location,
            description: result?.location_description,
          },
          location_description: result?.location_description,
          asset_id: {
            value: result?.asset_id,
            label: result?.asset_num,
            description: result?.asset_description,
          },
          asset_description: result?.asset_description,
          inspector: result?.inspector,
          measurement_point: result?.measurement_point,
          measurement_value: result?.measurement_value,
          measurement_date: result?.measurement_date
            ? moment(result?.measurement_date).format('YYYY-MM-DDTHH:mm')
            : null,
          target_start: result?.target_start
            ? moment(result?.target_start).format('YYYY-MM-DDTHH:mm')
            : null,
          target_finish: result?.target_finish
            ? moment(result?.target_finish).format('YYYY-MM-DDTHH:mm')
            : null,
          scheduled_start: result?.scheduled_start
            ? moment(result?.scheduled_start).format('YYYY-MM-DDTHH:mm')
            : null,
          scheduled_finish: result?.scheduled_finish
            ? moment(result?.scheduled_finish).format('YYYY-MM-DDTHH:mm')
            : null,
          start_no_earlier_than: result?.start_no_earlier_than
            ? moment(result?.start_no_earlier_than).format('YYYY-MM-DDTHH:mm')
            : null,
          finish_no_later_than: result?.finish_no_later_than
            ? moment(result?.finish_no_later_than).format('YYYY-MM-DDTHH:mm')
            : null,
          actual_start: result?.actual_start
            ? moment(result?.actual_start).format('YYYY-MM-DDTHH:mm')
            : null,
          actual_finish: result?.actual_finish
            ? moment(result?.actual_finish).format('YYYY-MM-DDTHH:mm')
            : null,
          duration_in_minute: `${result?.estimated_duration}`,
        },
      ],
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getJobPlanTaskDetail.data, mode])

  const createJobPlanTask = useCreateJobPlanTask()
  const updateJobPlanTask = useUpdateJobPlanTask()

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
        const newValues = values.job_plan_task.map((res) => {
          const baseObject = {
            sequence: Number(res.sequence),
            task: res.task,
            description: res.description,
            status: res.status?.value ? res.status?.value : '',
            location_id: res.location_id?.value,
            location_description: res.location_id?.description,
            asset_id: res.asset_id?.value,
            asset_description: res.asset_id?.description,
            inspector: res.inspector,
            measurement_point: res.measurement_point,
            measurement_value: res.measurement_value,
            measurement_date: res.measurement_date
              ? moment(res.measurement_date).format('YYYY-MM-DDTHH:mm:ssZ')
              : null,
            target_start: res.target_start
              ? moment(res.target_start).format('YYYY-MM-DDTHH:mm:ssZ')
              : null,
            target_finish: res.target_finish
              ? moment(res.target_finish).format('YYYY-MM-DDTHH:mm:ssZ')
              : null,
            scheduled_start: res.scheduled_start
              ? moment(res.scheduled_start).format('YYYY-MM-DDTHH:mm:ssZ')
              : null,
            scheduled_finish: res.scheduled_finish
              ? moment(res.scheduled_finish).format('YYYY-MM-DDTHH:mm:ssZ')
              : null,
            start_no_earlier_than: res.start_no_earlier_than
              ? moment(res.start_no_earlier_than).format('YYYY-MM-DDTHH:mm:ssZ')
              : null,
            finish_no_later_than: res.finish_no_later_than
              ? moment(res.finish_no_later_than).format('YYYY-MM-DDTHH:mm:ssZ')
              : null,
            actual_start: res.actual_start
              ? moment(res.actual_start).format('YYYY-MM-DDTHH:mm:ssZ')
              : null,
            actual_finish: res.actual_finish
              ? moment(res.actual_finish).format('YYYY-MM-DDTHH:mm:ssZ')
              : null,
            duration_in_minute: res.duration_in_minute ? Number(res.duration_in_minute) : 0,
          }

          if (mode === 'UpdateJobPlanTask') {
            return {
              ...baseObject,
              work_order_id: res.work_order_id,
              work_order_task_id: res.work_order_task_id,
            }
          }

          return baseObject
        })

        if (mode === 'CreateJobPlanTask') {
          await createJobPlanTask
            .mutateAsync({
              id: selectedRow?.job_plan_id,
              data: newValues,
            })
            .then(() => {
              Notification.fire({
                icon: 'success',
                title: 'Success',
                text: 'Create job plan task successfully',
                customClass: {
                  confirmButton: 'btn btn-primary hover:text-white',
                },
                buttonsStyling: false,
              }).then(() => {
                setTabIndex(1)
                setAction('Read')
              })
            })
            .catch((err) => {
              Notification.fire({
                icon: 'error',
                title: 'Oops...!',
                text: err.response.data.error,
                customClass: {
                  confirmButton: 'btn btn-primary hover:text-white',
                },
                buttonsStyling: false,
              })
            })
            .finally(() => {
              formikHelpers.setSubmitting(false)
            })
        }

        if (mode === 'UpdateJobPlanTask') {
          await updateJobPlanTask
            .mutateAsync({
              data: newValues,
            })
            .then(() => {
              Notification.fire({
                icon: 'success',
                title: 'Success',
                text: 'Update job plan task successfully',
                customClass: {
                  confirmButton: 'btn btn-primary hover:text-white',
                },
                buttonsStyling: false,
              }).then(() => {
                setTabIndex(1)
                setAction('Read')
              })
            })
            .catch((err) => {
              Notification.fire({
                icon: 'error',
                title: 'Oops...!',
                text: err.response.data.error,
                customClass: {
                  confirmButton: 'btn btn-primary hover:text-white',
                },
                buttonsStyling: false,
              })
            })
            .finally(() => {
              formikHelpers.setSubmitting(false)
            })
        }
      }
    })
  }

  const disabled = getJobPlanTaskDetail.isLoading

  return {
    status,
    disabled,
    formValue,
    handleSubmit,
    getLocationDropdown,
    getAssetDropdown,
  }
}

export default useJobPlanTaskForm
