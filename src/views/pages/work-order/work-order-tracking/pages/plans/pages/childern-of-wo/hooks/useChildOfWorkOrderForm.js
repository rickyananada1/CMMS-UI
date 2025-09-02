import { useSelector } from 'react-redux'
import { useState } from 'react'
import useTimeFormatter from '../../../hooks/useTimeFormatter'
import { useCreateChildOfWorkOrder, useUpdateChildOfWorkOrder } from '../services'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment'

const useChildOfWorkOrderForm = ({ mode, setAction }) => {
  const Notification = withReactContent(Swal)
  const { formatDateToUTC } = useTimeFormatter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const selectedRow = useSelector((state) => state.woTracking?.selectedWorkOrder)
  const selectedChildernRow = useSelector((state) => state.woChildern?.selectedGroup)
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
    record: '',
    description: '',
    classification: '',
    work_priority: '',
    location_id: null,
    location_description: '',
    asset_id: null,
    asset_description: '',
    job_plan_id: null,
    job_plan_description: '',
    status: '',
    gl_account_id: null,
    // target_start: null,
    // target_finish: null,
    scheduled_start: new Date().toISOString().slice(0, 10),
    scheduled_finish: new Date(new Date().getTime() + 86400000).toISOString().slice(0, 10),
    // start_no_earlier_than: null,
    // finish_no_later_than: null,
    // actual_start: null,
    // actual_finish: null,
    duration_in_minute: 150,
  }
  const initialValueUpdate = {
    sequence: selectedChildernRow?.sequence,
    record: selectedChildernRow?.work_order_id
      ? { label: selectedChildernRow?.work_order_code, value: selectedChildernRow?.work_order_id }
      : null,
    description: selectedChildernRow?.description,
    classification: selectedChildernRow?.classification,
    work_priority: selectedChildernRow?.work_priority,
    location_id: selectedChildernRow?.location_id
      ? { label: selectedChildernRow?.location, value: selectedChildernRow?.location_id }
      : null,
    location_description: selectedChildernRow?.location_desc,
    asset_id: selectedChildernRow?.asset_id
      ? { label: selectedChildernRow?.asset_num, value: selectedChildernRow?.asset_id }
      : null,
    asset_description: selectedChildernRow?.asset_desc,
    job_plan_id: selectedChildernRow?.job_plan_id
      ? {
          label: selectedChildernRow?.job_plan_name,
          value: selectedChildernRow?.job_plan_id,
          description: selectedChildernRow?.job_plan_description,
        }
      : null,
    status: selectedChildernRow?.status,
    gl_account_id: {
      value: selectedChildernRow?.gl_account_id,
      label: selectedChildernRow?.gl_account_name,
    },
    // target_start: selectedChildernRow?.target_start?.substring(0, 10),
    // target_finish: selectedChildernRow?.target_finish?.substring(0, 10),
    scheduled_start: selectedChildernRow?.scheduled_start?.substring(0, 10),
    scheduled_finish: selectedChildernRow?.scheduled_finish?.substring(0, 10),
    // start_no_earlier_than: selectedChildernRow?.start_no_earlier_than?.substring(0, 10),
    // finish_no_later_than: selectedChildernRow?.finish_no_later_than?.substring(0, 10),
    // actual_start: selectedChildernRow?.actual_start?.substring(0, 10),
    // actual_finish: selectedChildernRow?.actual_finish?.substring(0, 10),
    duration_in_minute: selectedChildernRow?.duration_in_minute,
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

  const setFieldValue = (key, key_desc, event, data, any) => {
    const updatedDesc = data
      .filter((item) => item[any ? any : key] === event.value)
      .map((obj) => obj[key_desc])
      .join(', ')

    setTextFields({ ...textFields, [key]: event, [key_desc]: updatedDesc })
  }

  const setAutofill = (selectedVal, data) => {
    const selectedRecord = data.find((item) => item.work_order_code === selectedVal.label)
    textFields.record = selectedVal
    textFields.description = selectedRecord?.description ?? ''
    textFields.classification = selectedRecord?.classification ?? ''
    textFields.work_priority = selectedRecord?.work_priority ?? ''
    textFields.location_id = selectedRecord?.location_id
      ? { label: selectedRecord?.location, value: selectedRecord?.location_id }
      : null
    textFields.location_description = selectedRecord?.location_desc ?? ''
    textFields.asset_id = selectedRecord?.asset_id
      ? { label: selectedRecord?.asset_num, value: selectedRecord?.asset_id }
      : null
    textFields.asset_description = selectedRecord?.asset_desc ?? ''
    textFields.status = selectedRecord?.status ?? ''
    textFields.gl_account_id = selectedRecord?.gl_account_id
      ? {
          value: selectedRecord?.gl_account_id,
          label: selectedRecord?.gl_account_name,
        }
      : null
    textFields.scheduled_start = selectedRecord?.scheduled_start
      ? formatDateToUTC(selectedRecord?.scheduled_start)
      : new Date().toISOString().slice(0, 10)
    textFields.scheduled_finish = selectedRecord?.scheduled_finish
      ? formatDateToUTC(selectedRecord?.scheduled_finish)
      : new Date(new Date().getTime() + 86400000).toISOString().slice(0, 10)
    textFields.job_plan_id = selectedRecord?.job_plan_id
      ? {
          value: selectedRecord?.job_plan_id,
          label: selectedRecord?.job_plan_name,
          description: selectedRecord?.job_plan_description,
        }
      : null
    setTextFields({ ...textFields })
  }

  const createChildOfWorkOrder = useCreateChildOfWorkOrder()

  const handleCreateChildOfWorkOrder = async () => {
    const scheduled_start = textFields?.scheduled_start
      ? formatDateToUTC(textFields?.scheduled_start)
      : null
    const scheduled_finish = textFields?.scheduled_finish
      ? formatDateToUTC(textFields?.scheduled_finish)
      : null
    const body = {
      sequence: parseInt(textFields?.sequence),
      record: textFields?.record?.label,
      description: textFields?.description,
      work_priority: textFields?.work_priority,
      // classification: textFields?.classification,
      location_id: parseInt(textFields?.location_id?.value),
      location_description: textFields?.location_description,
      asset_id: parseInt(textFields?.asset_id?.value),
      asset_description: textFields?.asset_description,
      job_plan_id: parseInt(textFields?.job_plan_id?.value),
      job_plan_description: textFields?.job_plan_id?.description,
      status: textFields?.status,
      gl_account_id: parseInt(textFields?.gl_account_id?.value),
      // target_start: formatDateToUTC(textFields?.target_start),
      // target_finish: formatDateToUTC(textFields?.target_finish),
      scheduled_start: formatDateToUTC(textFields?.scheduled_start),
      scheduled_finish: formatDateToUTC(textFields?.scheduled_finish),
      // start_no_earlier_than: formatDateToUTC(textFields?.start_no_earlier_than),
      // finish_no_later_than: formatDateToUTC(textFields?.finish_no_later_than),
      // actual_start: formatDateToUTC(textFields?.actual_start),
      // actual_finish: formatDateToUTC(textFields?.actual_finish),
      duration_in_minute: moment(scheduled_finish).diff(moment(scheduled_start), 'minutes', true),
      work_order_id: textFields?.record?.value,
    }

    setIsSubmitting(true)
    await createChildOfWorkOrder
      .mutateAsync({
        data: body,
        id: selectedRow?.work_order_id,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Child of work order added successfully.`,
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

  const updateChildOfWorkOrder = useUpdateChildOfWorkOrder()

  const handleUpdateChildOfWorkOrder = async () => {
    const scheduled_start = textFields?.scheduled_start
      ? formatDateToUTC(textFields?.scheduled_start)
      : null
    const scheduled_finish = textFields?.scheduled_finish
      ? formatDateToUTC(textFields?.scheduled_finish)
      : null
    const body = {
      sequence: parseInt(textFields?.sequence),
      record: textFields?.record?.label,
      description: textFields?.description,
      work_priority: textFields?.work_priority,
      // classification: textFields?.classification,
      location_id: parseInt(textFields?.location_id?.value),
      location_description: textFields?.location_description,
      asset_id: parseInt(textFields?.asset_id?.value),
      asset_description: textFields?.asset_description,
      job_plan_id: parseInt(textFields?.job_plan_id?.value),
      job_plan_description: textFields?.job_plan_id?.description,
      status: textFields?.status,
      gl_account_id: parseInt(textFields?.gl_account_id?.value),
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
      work_order_id: textFields?.record?.value,
    }

    setIsSubmitting(true)
    await updateChildOfWorkOrder
      .mutateAsync({
        data: body,
        id: selectedRow?.work_order_id,
        plan_id: selectedChildernRow?.work_order_plan_id,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Child of work order updated successfully.`,
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
          ? await handleCreateChildOfWorkOrder()
          : await handleUpdateChildOfWorkOrder()
      }
    })
  }

  return {
    selectedRow,
    setFieldValue,
    setChange,
    textFields,
    handleCreateChildOfWorkOrder,
    handleUpdateChildOfWorkOrder,
    optionsStatus,
    isLoading,
    isSubmitting,
    errorMessage,
    initialValueUpdate,
    initialValue,
    formatDateToUTC,
    handleSubmit,
    setAutofill,
  }
}

export default useChildOfWorkOrderForm
