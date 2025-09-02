import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'
import useTimeFormatter from 'src/hooks/useTimeFormatter'
import moment from 'moment'
import { useCreateQRTask, useUpdateQRTask } from '../services'

const useQRTaskForm = ({ mode, setAction }) => {
  const Notification = withReactContent(Swal)
  const { formatDateToUTC } = useTimeFormatter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const selectedRow = useSelector((state) => state.quickReporting?.selectedWorkOrder)
  const selectedTaskRow = useSelector((state) => state.quickReporting?.selectedTask)

  const optionsStatus = [
    { label: 'WAPPR', value: 'WAPPR' },
    { label: 'APPR', value: 'APPR' },
    { label: 'WSCH', value: 'WSCH' },
    { label: 'WMATL', value: 'WMATL' },
    { label: 'WPCOND', value: 'WPCOND' },
    { label: 'INPRG', value: 'INPRG' },
    { label: 'COMP', value: 'COMP' },
    { label: 'CLOSE', value: 'CLOSE' },
    { label: 'CAN', value: 'CAN' },
    { label: 'HISTEDIT', value: 'HISTEDIT' },
  ]

  const initialValue = {
    sequence: null,
    task: '',
    description: '',
    status: '',
    location_id: null,
    location_description: '',
    asset_id: null,
    asset_description: '',
    inspector: '',
    measurement_point: '',
    measurement_value: '',
    measurement_date: '',
    target_start: null,
    target_finish: null,
    scheduled_start: new Date().toISOString().slice(0, 10),
    scheduled_finish: new Date(new Date().getTime() + 86400000).toISOString().slice(0, 10),
    start_no_earlier_than: null,
    finish_no_later_than: null,
    actual_start: null,
    actual_finish: null,
    duration_in_minute: 150,
  }

  const initialValueUpdate = {
    sequence: selectedTaskRow?.sequence,
    task: selectedTaskRow?.task,
    description: selectedTaskRow?.description,
    status: selectedTaskRow?.status,
    location_id: selectedTaskRow?.location_id
      ? { label: selectedTaskRow?.location, value: selectedTaskRow?.location_id }
      : null,
    location_description: selectedTaskRow?.location_description,
    asset_id: selectedTaskRow?.asset_id
      ? { label: selectedTaskRow?.asset_num, value: selectedTaskRow?.asset_id }
      : null,
    asset_description: selectedTaskRow?.asset_description,
    inspector: selectedTaskRow?.inspector,
    measurement_point: selectedTaskRow?.measurement_point,
    measurement_value: selectedTaskRow?.measurement_value,
    measurement_date: selectedTaskRow?.measurement_date?.substring(0, 10),
    target_start: selectedTaskRow?.target_start?.substring(0, 10),
    target_finish: selectedTaskRow?.target_finish?.substring(0, 10),
    scheduled_start: selectedTaskRow?.scheduled_start?.substring(0, 10),
    scheduled_finish: selectedTaskRow?.scheduled_finish?.substring(0, 10),
    start_no_earlier_than: selectedTaskRow?.start_no_earlier_than?.substring(0, 10),
    finish_no_later_than: selectedTaskRow?.finish_no_later_than?.substring(0, 10),
    actual_start: selectedTaskRow?.actual_start?.substring(0, 10),
    actual_finish: selectedTaskRow?.actual_finish?.substring(0, 10),
    duration_in_minute: selectedTaskRow?.duration_in_minute,
  }

  const [textFields, setTextFields] = useState(
    mode === 'Create' ? initialValue : initialValueUpdate,
  )

  const setChange = (event) => {
    if (event.target.name === 'scheduled_start') {
      textFields.scheduled_finish = event.target.value
    }
    setTextFields({ ...textFields, [event.target.name]: event.target.value })
  }

  const setField = (key, key_desc, event, data, any) => {
    const updatedDesc = data
      .filter((item) => item[any ? any : key] === event.value)
      .map((obj) => obj[key_desc])
      .join(', ')

    setTextFields({ ...textFields, [key]: event, [key_desc]: updatedDesc })
  }

  const createQRTask = useCreateQRTask()

  const handleCreateTaskforWorkOrder = async () => {
    const scheduled_start = textFields?.scheduled_start
      ? formatDateToUTC(textFields?.scheduled_start)
      : null
    const scheduled_finish = textFields?.scheduled_finish
      ? formatDateToUTC(textFields?.scheduled_finish)
      : null
    const body = {
      sequence: parseInt(textFields?.sequence),
      task: textFields?.task,
      description: textFields?.description,
      status: textFields?.status,
      location_id: parseInt(textFields?.location_id.value),
      location_description: textFields?.location_description,
      asset_id: parseInt(textFields?.asset_id.value),
      asset_description: textFields?.asset_description,
      inspector: textFields?.inspector,
      measurement_point: textFields?.measurement_point,
      measurement_value: textFields?.measurement_value,
      measurement_date: textFields?.measurement_date
        ? formatDateToUTC(textFields?.measurement_date)
        : null,
      target_start: textFields?.target_start ? formatDateToUTC(textFields?.target_start) : null,
      target_finish: textFields?.target_finish ? formatDateToUTC(textFields?.target_finish) : null,
      scheduled_start: textFields?.scheduled_start
        ? formatDateToUTC(textFields?.scheduled_start)
        : null,
      scheduled_finish: textFields?.scheduled_finish
        ? formatDateToUTC(textFields?.scheduled_finish)
        : null,
      start_no_earlier_than: textFields?.start_no_earlier_than
        ? formatDateToUTC(textFields?.start_no_earlier_than)
        : null,
      finish_no_later_than: textFields?.finish_no_later_than
        ? formatDateToUTC(textFields?.finish_no_later_than)
        : null,
      actual_start: textFields?.actual_start ? formatDateToUTC(textFields?.actual_start) : null,
      actual_finish: textFields?.actual_finish ? formatDateToUTC(textFields?.actual_finish) : null,
      duration_in_minute: moment(scheduled_finish).diff(moment(scheduled_start), 'minutes', true),
    }

    setIsSubmitting(true)
    await createQRTask
      .mutateAsync({
        data: body,
        id: selectedRow?.work_order_id,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Task for work order added successfully.`,
          }).then(() => {
            setAction('Read')
            setIsSubmitting(false)
          })
        }
      })
      .catch((err) => {
        setErrorMessage(err)
        Notification.fire({
          icon: 'error',
          title: 'Error!',
          text: `${err.response.data.message}.`,
        }).then(() => {
          setIsSubmitting(false)
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const updateQRTask = useUpdateQRTask()

  const handleUpdateTaskforWorkOrder = async () => {
    const scheduled_start = textFields?.scheduled_start
      ? formatDateToUTC(textFields?.scheduled_start)
      : null
    const scheduled_finish = textFields?.scheduled_finish
      ? formatDateToUTC(textFields?.scheduled_finish)
      : null
    const body = {
      sequence: parseInt(textFields?.sequence),
      task: textFields?.task,
      description: textFields?.description,
      status: textFields?.status,
      location_id: parseInt(textFields?.location_id.value),
      location_description: textFields?.location_description,
      asset_id: parseInt(textFields?.asset_id.value),
      asset_description: textFields?.asset_description,
      inspector: textFields?.inspector,
      measurement_point: textFields?.measurement_point,
      measurement_value: textFields?.measurement_value,
      measurement_date: textFields?.measurement_date
        ? formatDateToUTC(textFields?.measurement_date)
        : null,
      target_start: textFields?.target_start ? formatDateToUTC(textFields?.target_start) : null,
      target_finish: textFields?.target_finish ? formatDateToUTC(textFields?.target_finish) : null,
      scheduled_start: textFields?.scheduled_start
        ? formatDateToUTC(textFields?.scheduled_start)
        : null,
      scheduled_finish: textFields?.scheduled_finish
        ? formatDateToUTC(textFields?.scheduled_finish)
        : null,
      start_no_earlier_than: textFields?.start_no_earlier_than
        ? formatDateToUTC(textFields?.start_no_earlier_than)
        : null,
      finish_no_later_than: textFields?.finish_no_later_than
        ? formatDateToUTC(textFields?.finish_no_later_than)
        : null,
      actual_start: textFields?.actual_start ? formatDateToUTC(textFields?.actual_start) : null,
      actual_finish: textFields?.actual_finish ? formatDateToUTC(textFields?.actual_finish) : null,
      duration_in_minute: moment(scheduled_finish).diff(moment(scheduled_start), 'minutes', true),
    }

    setIsSubmitting(true)
    await updateQRTask
      .mutateAsync({
        data: body,
        id: selectedRow?.work_order_id,
        task_id: selectedTaskRow?.work_order_task_id,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Task for work order updated successfully.`,
          }).then(() => {
            setAction('Read')
            setIsSubmitting(false)
          })
        }
      })
      .catch((err) => {
        setErrorMessage(err)
        Notification.fire({
          icon: 'error',
          title: 'Error!',
          text: `${err.response.data.message}.`,
        }).then(() => {
          setIsSubmitting(false)
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

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
        mode === 'Create'
          ? await handleCreateTaskforWorkOrder()
          : await handleUpdateTaskforWorkOrder()
      }
    })
  }

  return {
    optionsStatus,
    initialValue,
    textFields,
    setChange,
    setField,
    handleCreateTaskforWorkOrder,
    handleUpdateTaskforWorkOrder,
    isLoading,
    isSubmitting,
    errorMessage,
    handleSubmit,
  }
}

export default useQRTaskForm
