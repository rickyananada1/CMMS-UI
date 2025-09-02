import { useState, useEffect } from 'react'
import {
  useUpdateTools,
  useGetTools_,
  useGetDetailTools,
  useCreateToolsMultiple,
} from '../services'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { quickReportingActions } from 'src/views/pages/work-order/quick-reporting/slices/quickReportingSlices'

const useToolsForm = ({ mode, setAction }) => {
  const Notification = withReactContent(Swal)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const selectedWorkOrderRow = useSelector((state) => state.quickReporting?.selectedWorkOrder)
  const selectedTask = useSelector((state) => state.quickReporting?.selectedTask)
  const selectedToolsRow = useSelector((state) => state.quickReporting?.selectedTool)

  const dispatch = useDispatch()
  const setSelectedToolRow = (param) => {
    dispatch(quickReportingActions.setSelectedTool(param))
  }

  const initialValue = {
    work_order_task_id: '',
    tool: '',
    description: '',
    quantity: 1,
    unit_cost: 0,
    line_cost: 0,
    tools: [
      {
        work_order_task_id: '',
        tool: '',
        description: '',
        quantity: 1,
        unit_cost: 0,
        line_cost: 0,
      },
    ],
  }

  const [textFields, setTextFields] = useState(initialValue)

  const getDetailWorkOrderTaskToolsService = useGetDetailTools({
    id: selectedWorkOrderRow?.work_order_id,
    tool_id: selectedToolsRow?.work_order_tool_id,
  })

  const getDetailWorkOrderTaskTools = async () => {
    await getDetailWorkOrderTaskToolsService
      .mutateAsync({
        id: selectedWorkOrderRow?.work_order_id,
        tool_id: selectedToolsRow?.work_order_tool_id,
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data?.data

          setTextFields({
            work_order_task_id: {
              label: data?.task,
              value: data?.work_order_task_id,
            },
            tool: data?.tool,
            description: data?.description,
            quantity: data?.quantity,
            unit_cost: data?.unit_cost,
            line_cost: data?.line_cost,
          })
        }
      })
  }

  const handleAddTextField = () => {
    const newTextField = {
      work_order_task_id: '',
      tool: null,
      description: '',
      quantity: 1,
      unit_cost: null,
      line_cost: null,
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

  const setFieldDesc = (key, key_desc, event, data, any) => {
    const updatedDesc = data
      .filter((item) => item[any ? any : key] === event.value)
      .map((obj) => obj[key_desc])
      .join(', ')

    setTextFields({ ...textFields, [key]: event.value, [key_desc]: updatedDesc })
  }

  const getWorkOrderTaskToolsService = useGetTools_({
    id: selectedWorkOrderRow?.work_order_id,
  })

  const createTools = useCreateToolsMultiple()

  const handleCreateTools = async (values) => {
    const body = values.tools.map((item) => ({
      work_order_task_id: item?.work_order_task_id?.value,
      tool: item?.tool,
      description: item?.description,
      quantity: Number(item?.quantity),
      unit_cost: Number(String(item?.unit_cost ?? '0').replace(/,/g, '.')),
      line_cost: Number(String(item?.line_cost ?? '0').replace(/,/g, '.')),
    }))

    setIsSubmitting(true)
    await createTools
      .mutateAsync({
        data: body,
        id: selectedTask?.work_order_task_id,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Tools added successfully.`,
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
          text: `${err?.response?.data?.message}.`,
        }).then(() => {
          setIsSubmitting(false)
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const updateTools = useUpdateTools()

  const handleUpdateTools = async (values) => {
    const body = {
      work_order_task_id: values?.work_order_task_id?.value,
      tool: values?.tool,
      description: values?.description,
      quantity: Number(values?.quantity),
      unit_cost: Number(String(values?.unit_cost ?? '0').replace(/,/g, '.')),
      line_cost: Number(String(values?.line_cost ?? '0').replace(/,/g, '.')),
    }

    setIsSubmitting(true)
    await updateTools
      .mutateAsync({
        data: body,
        id: body?.work_order_task_id,
        material_id: selectedToolsRow?.work_order_tool_id,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Tools updated successfully.`,
          }).then(() => {
            setSelectedToolRow({
              ...selectedToolsRow,
              tool: body?.tool,
            })
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
          text: `${err?.response?.data?.message}.`,
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
        if (mode === 'Create Tools') {
          handleCreateTools(values)
        } else if (mode === 'Update Tools') {
          handleUpdateTools(values)
        }
      }
    })
  }

  useEffect(() => {
    if (mode === 'Update Tools') {
      getDetailWorkOrderTaskTools()
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
    setFieldDesc,
    handleCreateTools,
    handleUpdateTools,
    isLoading,
    isSubmitting,
    errorMessage,
    selectedWorkOrderRow,
    selectedToolsRow,
    getWorkOrderTaskToolsService,
    handleSubmit,
  }
}

export default useToolsForm
