import { useState } from 'react'
import { useDeleteLabor, useGetLaborList } from '../../services/labor'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

const useLaborDelete = ({ setAction }) => {
  const Notification = withReactContent(Swal)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const selectedTaskRow = useSelector((state) => state.woTask?.selectedGroup)

  const [textFields, setTextFields] = useState({
    work_order_labor_id: null,
  })

  const getLaborListService = useGetLaborList({
    id: selectedTaskRow?.work_order_task_id,
  })

  const deleteLabor = useDeleteLabor({
    id: selectedTaskRow?.work_order_task_id,
    labor_id: textFields?.work_order_labor_id?.value,
  })

  const handleDeleteLabor = async (values) => {
    setIsLoading(true)
    await deleteLabor
      .mutateAsync({
        id: selectedTaskRow?.work_order_task_id,
        labor_id: values?.work_order_labor_id?.value,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Labor deleted successfully.`,
          }).then(() => {
            setTextFields({
              work_order_labor_id: null,
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
    handleDeleteLabor,
    selectedTaskRow,
    getLaborListService,
  }
}

export default useLaborDelete
