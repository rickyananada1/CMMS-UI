import { useState } from 'react'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { useGetQRTaskList, useDeleteQRTask } from '../services'

const useQRTaskDelete = ({ setAction }) => {
  const Notification = withReactContent(Swal)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const selectedRow = useSelector((state) => state.quickReporting?.selectedWorkOrder)

  const [textFields, setTextFields] = useState({
    work_order_task_id: null,
  })

  const getTaskListService = useGetQRTaskList({
    id: selectedRow?.work_order_task_id,
  })

  const deleteTask = useDeleteQRTask({
    id: selectedRow?.work_order_task_id,
    task_id: textFields?.work_order_task_id?.value,
  })

  const handleDeleteTask = async (values) => {
    setIsLoading(true)
    await deleteTask
      .mutateAsync({
        id: selectedRow?.work_order_id,
        task_id: values?.work_order_task_id?.value,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Task deleted successfully.`,
          }).then(() => {
            setTextFields({
              work_order_task_id: null,
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
    selectedRow,
    getTaskListService,
    handleDeleteTask,
  }
}

export default useQRTaskDelete
