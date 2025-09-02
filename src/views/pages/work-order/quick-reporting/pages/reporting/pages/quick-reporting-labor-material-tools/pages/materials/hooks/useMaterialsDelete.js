import { useState } from 'react'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { useDeleteMaterials, useGetMaterialsList } from '../services'

const useMaterialsDelete = ({ setAction }) => {
  const Notification = withReactContent(Swal)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const selectedTaskRow = useSelector((state) => state.quickReporting?.selectedTask)

  const [textFields, setTextFields] = useState({
    work_order_material_id: null,
  })

  const getMaterialsListService = useGetMaterialsList({
    id: selectedTaskRow?.work_order_task_id,
  })

  const deleteMaterials = useDeleteMaterials({
    id: selectedTaskRow?.work_order_task_id,
    material_id: textFields?.work_order_material_id?.value,
  })

  const handleDeleteMaterials = async (values) => {
    setIsLoading(true)
    await deleteMaterials
      .mutateAsync({
        id: selectedTaskRow?.work_order_task_id,
        material_id: values?.work_order_material_id?.value,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Materials deleted successfully.`,
          }).then(() => {
            setTextFields({
              work_order_material_id: null,
            })
            setAction('Read')
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
          setAction('Read')
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    textFields,
    isLoading,
    errorMessage,
    selectedTaskRow,
    getMaterialsListService,
    handleDeleteMaterials,
  }
}

export default useMaterialsDelete
