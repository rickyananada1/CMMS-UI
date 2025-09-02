import { useState, useEffect } from 'react'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import {
  useUpdateMaterials,
  useGetMaterials_,
  useGetDetailMaterials,
  useCreateMaterialsMultiple,
} from '../services'
import { useDispatch, useSelector } from 'react-redux'
import { useGetSpareparts } from 'src/views/pages/work-order/work-order-tracking/pages/plans/services'
import { quickReportingActions } from 'src/views/pages/work-order/quick-reporting/slices/quickReportingSlices'

const useMaterialsForm = ({ mode, setAction }) => {
  const Notification = withReactContent(Swal)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const selectedWorkOrderRow = useSelector((state) => state.quickReporting?.selectedWorkOrder)
  const selectedTask = useSelector((state) => state.quickReporting?.selectedTask)
  const selectedMaterialsRow = useSelector((state) => state.quickReporting?.selectedMaterial)

  const dispatch = useDispatch()
  const setSelectedMaterialRow = (param) => {
    dispatch(quickReportingActions.setSelectedMaterial(param))
  }

  const optionsStatus = [
    { label: 'FIRSTCLASS', value: 'FIRSTCLASS' },
    { label: 'SECONDCLASS', value: 'SECONDCLASS' },
    { label: 'APPRENTICE', value: 'APPRENTICE' },
  ]

  const initialValue = {
    work_order_task_id: '',
    sparepart_id: null,
    description: '',
    quantity: 1,
    issue_unit: '',
    unit_cost: 0,
    line_cost: 0,
    store_room: '',
    materials: [
      {
        work_order_task_id: '',
        sparepart_id: null,
        description: '',
        quantity: 1,
        issue_unit: '',
        unit_cost: 0,
        line_cost: 0,
        store_room: '',
      },
    ],
  }

  const [textFields, setTextFields] = useState(initialValue)

  const getDetailWorkOrderMaterialsService = useGetDetailMaterials({
    id: selectedWorkOrderRow?.work_order_id,
    material_id: selectedMaterialsRow?.work_order_material_id,
  })

  const getDetailWorkOrderTaskMaterials = async () => {
    await getDetailWorkOrderMaterialsService
      .mutateAsync({
        id: selectedWorkOrderRow?.work_order_id,
        material_id: selectedMaterialsRow?.work_order_material_id,
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data?.data

          setTextFields({
            work_order_task_id: {
              label: data?.task,
              value: data?.work_order_task_id,
            },
            sparepart_id: {
              label: data?.item_num,
              value: data?.sparepart_id,
              description: data?.description,
            },
            description: data?.description,
            quantity: data?.quantity,
            issue_unit: data?.issue_unit,
            unit_cost: data?.unit_cost,
            line_cost: data?.line_cost,
            store_room: data?.store_room,
          })
        }
      })
  }

  const handleAddTextField = () => {
    const newTextField = {
      work_order_task_id: '',
      sparepart_id: 0,
      description: '',
      quantity: 0,
      issue_unit: '',
      unit_cost: 0,
      line_cost: 0,
      store_room: '',
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

  const getWorkOrderTaskMaterialsService = useGetMaterials_({
    id: selectedWorkOrderRow?.work_order_id,
  })

  const getSparepartsService = useGetSpareparts()

  const createMaterials = useCreateMaterialsMultiple()

  const handleCreateMaterials = async (values) => {
    const body = values.materials.map((item) => ({
      work_order_task_id: item?.work_order_task_id?.value,
      sparepart_id: item?.sparepart_id?.value,
      description: item?.sparepart_id?.description,
      quantity: Number(item?.quantity),
      issue_unit: item?.issue_unit,
      unit_cost: Number(item?.unit_cost),
      line_cost: Number(((+item?.quantity || 0) * (+item?.unit_cost || 0)).toFixed(2)),
      store_room: item?.store_room,
    }))

    setIsSubmitting(true)
    await createMaterials
      .mutateAsync({
        data: body,
        id: selectedTask?.work_order_task_id,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Materials added successfully.`,
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

  const updateMaterials = useUpdateMaterials()

  const handleUpdateMaterials = async (values) => {
    const body = {
      work_order_task_id: values?.work_order_task_id?.value,
      sparepart_id: values?.sparepart_id?.value,
      description: values?.sparepart_id?.description,
      quantity: Number(values?.quantity),
      issue_unit: values?.issue_unit,
      unit_cost: Number(values?.unit_cost),
      line_cost: Number(((+values?.quantity || 0) * (+values?.unit_cost || 0)).toFixed(2)),
      store_room: values?.store_room,
    }

    setIsSubmitting(true)
    await updateMaterials
      .mutateAsync({
        data: body,
        id: body?.work_order_task_id,
        material_id: selectedMaterialsRow?.work_order_material_id,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Materials updated successfully.`,
          }).then(() => {
            setSelectedMaterialRow({
              ...selectedMaterialsRow,
              item_num: values?.sparepart_id?.label,
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
        if (mode === 'Create Materials') {
          handleCreateMaterials(values)
        } else if (mode === 'Update Materials') {
          handleUpdateMaterials(values)
        }
      }
    })
  }

  useEffect(() => {
    if (mode === 'Update Materials') {
      getDetailWorkOrderTaskMaterials()
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
    handleCreateMaterials,
    handleUpdateMaterials,
    handleSubmit,
    optionsStatus,
    isLoading,
    isSubmitting,
    errorMessage,
    selectedWorkOrderRow,
    getWorkOrderTaskMaterialsService,
    getSparepartsService,
  }
}

export default useMaterialsForm
