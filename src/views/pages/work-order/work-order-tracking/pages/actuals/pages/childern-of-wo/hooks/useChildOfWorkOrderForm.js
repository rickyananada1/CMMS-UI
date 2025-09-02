import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import useTimeFormatter from '../../../hooks/useTimeFormatter'
import { useCreateChildOfWorkOrder, useUpdateChildOfWorkOrder } from '../services'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useChildOfWorkOrderForm = ({ mode, setAction }) => {
  const Notification = withReactContent(Swal)
  const { formatDateToUTC } = useTimeFormatter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const selectedRow = useSelector((state) => state.woTracking?.selectedWorkOrder)
  const selectedChildernRow = useSelector((state) => state.woChildern?.selectedGroup)
  const [optionsStatus, setOptionsStatus] = useState([
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
  ])
  const initialValue = {
    sequence: null,
    record: '',
    description: '',
    work_priority: '',
    location_id: null,
    location_description: '',
    asset_id: null,
    asset_description: '',
    job_plan_id: null,
    job_plan_description: '',
    status: '',
    gl_account_id: null,
    target_start: '',
    target_finish: '',
    scheduled_start: '',
    scheduled_finish: '',
    start_no_earlier_than: '',
    finish_no_later_than: '',
    actual_start: '',
    actual_finish: '',
    duration_in_minute: 150,
  }
  const initialValueUpdate = {
    sequence: selectedChildernRow?.sequence,
    record: selectedChildernRow?.work_order_code,
    description: selectedChildernRow?.description,
    classification: selectedChildernRow?.classification,
    work_priority: selectedChildernRow?.work_priority,
    location_id: selectedChildernRow?.location,
    location_description: selectedChildernRow?.location_desc,
    asset_id: selectedChildernRow?.asset_num,
    asset_description: selectedChildernRow?.asset_desc,
    job_plan_id: selectedChildernRow?.job_plan_name ?? selectedChildernRow?.job_plan_id,
    job_plan_description: selectedChildernRow?.job_plan_description,
    status: selectedChildernRow?.status,
    gl_account_id: selectedChildernRow?.gl_account_id,
    // target_start: selectedChildernRow?.target_start?.substring(0, 10),
    // target_finish: selectedChildernRow?.target_finish?.substring(0, 10),
    scheduled_start: selectedChildernRow?.scheduled_start?.substring(0, 10),
    scheduled_finish: selectedChildernRow?.scheduled_finish?.substring(0, 10),
    // start_no_earlier_than: selectedChildernRow?.start_no_earlier_than?.substring(0, 10),
    // finish_no_later_than: selectedChildernRow?.finish_no_later_than?.substring(0, 10),
    actual_start: selectedChildernRow?.actual_start?.substring(0, 10),
    actual_finish: selectedChildernRow?.actual_finish?.substring(0, 10),
    duration_in_minute: selectedChildernRow?.duration_in_minute,
  }

  useEffect(() => {
    setOptionsStatus(
      optionsStatus.slice(
        optionsStatus.findIndex((s) => s.value === initialValueUpdate.status),
        -1,
      ),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [textFields, setTextFields] = useState(
    mode === 'Create' ? initialValue : initialValueUpdate,
  )

  const setChange = (event) => {
    setTextFields({ ...textFields, [event.target.name]: event.target.value })
  }

  const setFieldValue = (key, key_desc, event, data, any) => {
    const updatedDesc = data
      .filter((item) => item[any ? any : key] === event.value)
      .map((obj) => obj[key_desc])
      .join(', ')

    setTextFields({ ...textFields, [key]: event.value, [key_desc]: updatedDesc })
  }

  const createChildOfWorkOrder = useCreateChildOfWorkOrder()

  const handleCreateChildOfWorkOrder = async () => {
    const body = {
      sequence: parseInt(textFields?.sequence),
      record: textFields?.record,
      description: textFields?.description,
      work_priority: textFields?.work_priority,
      location_id: parseInt(textFields?.location_id),
      location_description: textFields?.location_description,
      asset_id: parseInt(textFields?.asset_id),
      asset_description: textFields?.asset_description,
      job_plan_id: parseInt(textFields?.job_plan_id),
      job_plan_description: textFields?.job_plan_description,
      status: textFields?.status,
      gl_account_id: parseInt(textFields?.gl_account_id),
      target_start: formatDateToUTC(textFields?.target_start),
      target_finish: formatDateToUTC(textFields?.target_finish),
      scheduled_start: formatDateToUTC(textFields?.scheduled_start),
      scheduled_finish: formatDateToUTC(textFields?.scheduled_finish),
      start_no_earlier_than: formatDateToUTC(textFields?.start_no_earlier_than),
      finish_no_later_than: formatDateToUTC(textFields?.finish_no_later_than),
      actual_start: formatDateToUTC(textFields?.actual_start),
      actual_finish: formatDateToUTC(textFields?.actual_finish),
      duration_in_minute: 150,
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
    const body = {
      sequence: parseInt(textFields?.sequence),
      record: textFields?.record,
      description: textFields?.description,
      work_priority: textFields?.work_priority,
      location_id: parseInt(textFields?.location_id),
      location_description: textFields?.location_description,
      asset_id: parseInt(textFields?.asset_id),
      asset_description: textFields?.asset_description,
      job_plan_id: parseInt(textFields?.job_plan_id),
      job_plan_description: textFields?.job_plan_description,
      status: textFields?.status,
      gl_account_id: parseInt(textFields?.gl_account_id),
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
      duration_in_minute: 150,
    }

    setIsSubmitting(true)
    await updateChildOfWorkOrder
      .mutateAsync({
        data: body,
        id: selectedRow?.work_order_id,
        plan_id: selectedChildernRow?.work_order_plan_actual_id,
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
    handleSubmit,
  }
}

export default useChildOfWorkOrderForm
