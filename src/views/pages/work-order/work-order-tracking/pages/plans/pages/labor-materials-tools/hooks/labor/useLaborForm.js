import { useState, useEffect } from 'react'
import {
  useCreateLabor,
  useUpdateLabor,
  useGetLabor_,
  useGetDetailLabor,
} from '../../services/labor'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { woLaborActions } from '../../slices/woLaborSlices'

const useLaborForm = ({ mode, setAction }) => {
  const Notification = withReactContent(Swal)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const dispatch = useDispatch()

  const selectedLaborRow = useSelector((state) => state.woLabor?.selectedGroup)
  const selectedWorkOrderRow = useSelector((state) => state.woTracking?.selectedWorkOrder)

  const optionsStatus = [
    { label: 'FIRSTCLASS', value: 'FIRSTCLASS' },
    { label: 'SECONDCLASS', value: 'SECONDCLASS' },
    { label: 'APPRENTICE', value: 'APPRENTICE' },
  ]

  const initialValue = {
    work_order_task_id: '',
    craft: '',
    skill_level: '',
    vendor: '',
    quantity: 1,
    labor: '',
    regular_hours: 0,
    rate: 0,
    line_cost: 0,
  }

  const [textFields, setTextFields] = useState(initialValue)

  const getWorkOrderTaskLaborService = useGetLabor_({
    id: selectedWorkOrderRow?.work_order_id,
  })

  const setSelectedLaborRow = (param) => {
    dispatch(woLaborActions.setSelectedGroup(param))
  }

  const getDetailWorkOrderTaskLaborService = useGetDetailLabor({
    id: selectedWorkOrderRow?.work_order_id,
    labor_id: selectedLaborRow?.work_order_labor_id,
  })

  const getDetailWorkOrderTaskLabor = async () => {
    await getDetailWorkOrderTaskLaborService
      .mutateAsync({
        id: selectedWorkOrderRow?.work_order_id,
        labor_id: selectedLaborRow?.work_order_labor_id,
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data?.data

          setTextFields({
            work_order_task_id: {
              label: data?.task,
              value: data?.work_order_task_id,
            },
            craft: data?.craft,
            skill_level: data?.skill_level,
            vendor: data?.vendor,
            quantity: data?.quantity,
            labor: data?.labor,
            regular_hours: data?.regular_hours,
            rate: data?.rate,
            line_cost: data?.line_cost,
          })
        }
      })
  }

  const handleAddTextField = () => {
    const newTextField = {
      work_order_task_id: '',
      craft: '',
      skill_level: '',
      vendor: '',
      quantity: 1,
      labor: '',
      regular_hours: 0,
      rate: 0,
      line_cost: 0,
    }
    setTextFields([...textFields, newTextField])
  }

  const handleRemoveTextField = (index) => {
    const updatedTextFields = textFields.filter((_, i) => i !== index)
    setTextFields(updatedTextFields)
  }

  const setChange = (event) => {
    // const updatedTextFields = [...textFields]
    // updatedTextFields[event.target.name] = event.target.value
    // setTextFields(updatedTextFields)
    setTextFields({ ...textFields, [event.target.name]: event.target.value })
  }

  const setField = (key, event) => {
    // const updatedTextFields = [...textFields]
    // updatedTextFields[key] = event.value

    // setTextFields(updatedTextFields)
    setTextFields({ ...textFields, [key]: event.value })
  }

  const createLabor = useCreateLabor()

  const handleCreateLabor = async (values) => {
    const body = {
      work_order_task_id: values?.work_order_task_id?.value,
      craft: values?.craft,
      skill_level: values?.skill_level,
      vendor: values?.vendor,
      quantity: Number(values?.quantity),
      labor: values?.labor,
      regular_hours: Number(values?.regular_hours),
      rate: Number(String(values?.rate ?? '0').replace(/,/g, '.') || 0),
      line_cost: Number(
        (
          (+values?.quantity || 0) *
          Number(String(values?.rate ?? '0').replace(/,/g, '.') || 0) *
          (+values?.regular_hours || 0)
        ).toFixed(2),
      ),
    }

    setIsSubmitting(true)
    await createLabor
      .mutateAsync({
        data: body,
        id: body?.work_order_task_id,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Labor added successfully.`,
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

  const updateLabor = useUpdateLabor()

  const handleUpdateLabor = async (values) => {
    const body = {
      work_order_task_id: values?.work_order_task_id?.value,
      craft: values?.craft,
      skill_level: values?.skill_level,
      vendor: values?.vendor,
      quantity: Number(values?.quantity),
      labor: values?.labor,
      regular_hours: Number(values?.regular_hours),
      rate: Number(String(values?.rate ?? '0').replace(/,/g, '.') || 0),
      line_cost: Number(
        (
          (+values?.quantity || 0) *
          Number(String(values?.rate ?? '0').replace(/,/g, '.') || 0) *
          (+values?.regular_hours || 0)
        ).toFixed(2),
      ),
    }

    setIsSubmitting(true)
    await updateLabor
      .mutateAsync({
        data: body,
        id: body?.work_order_task_id,
        labor_id: selectedLaborRow?.work_order_labor_id,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Labor updated successfully.`,
          }).then(() => {
            setSelectedLaborRow({ ...selectedLaborRow, craft: body?.craft })
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

  const handleSubmit = async (values) => {
    Notification.fire({
      icon: 'info',
      text: 'Are you sure to submit ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then((result) => {
      if (result.isConfirmed) {
        if (mode === 'Create Labor') {
          handleCreateLabor(values)
        } else if (mode === 'Update Labor') {
          handleUpdateLabor(values)
        }
      }
    })
  }

  useEffect(() => {
    if (mode === 'Update Labor') {
      getDetailWorkOrderTaskLabor()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  return {
    initialValue,
    textFields,
    handleAddTextField,
    handleRemoveTextField,
    setChange,
    setField,
    handleCreateLabor,
    handleUpdateLabor,
    optionsStatus,
    isLoading,
    isSubmitting,
    errorMessage,
    getWorkOrderTaskLaborService,
    handleSubmit,
    selectedWorkOrderRow,
  }
}

export default useLaborForm
