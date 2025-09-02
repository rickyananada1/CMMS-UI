import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDeleteTaskForWorkOrder } from '../services'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useTaskForWorkOrderDelete = ({ setAction }) => {
  const tableRef = useRef()
  const Notification = withReactContent(Swal)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const selectedRow = useSelector((state) => state.woTracking?.selectedWorkOrder)
  const [textFields, setTextFields] = useState({
    work_order_id: selectedRow?.work_order_id,
    work_order_task_id: 0,
  })

  const setChange = (event) => {
    setTextFields({ ...textFields, work_order_task_id: event.value })
  }

  const deleteTaskForWorkOder = useDeleteTaskForWorkOrder()

  const handleDeleteTaskForWorkOrder = async () => {
    setIsLoading(true)
    await deleteTaskForWorkOder
      .mutateAsync({
        data: textFields,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Task for work order deleted successfully.`,
          }).then(() => {
            setAction('Read')
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
          setAction('Read')
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    tableRef,
    setChange,
    handleDeleteTaskForWorkOrder,
    isLoading,
    errorMessage,
    selectedRow,
  }
}

export default useTaskForWorkOrderDelete
