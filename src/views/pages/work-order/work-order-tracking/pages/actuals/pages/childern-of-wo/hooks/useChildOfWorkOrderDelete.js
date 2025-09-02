import { useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDeleteChildOfWorkOrder } from '../services'

const useChildOfWorkOrderDelete = ({ setAction }) => {
  const Notification = withReactContent(Swal)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const selectedRow = useSelector((state) => state.woTracking?.selectedWorkOrder)
  const [textFields, setTextFields] = useState({
    work_order_id: selectedRow?.work_order_id,
    work_order_plan_id: 0,
  })

  const setChange = (event) => {
    setTextFields({ ...textFields, work_order_plan_id: event.value })
  }

  const deleteChildOfWorkOrder = useDeleteChildOfWorkOrder()

  const handleDeleteChildOfWorkOrder = async () => {
    setIsLoading(true)
    await deleteChildOfWorkOrder
      .mutateAsync({
        data: textFields,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Child of work order deleted successfully.`,
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
    setChange,
    handleDeleteChildOfWorkOrder,
    isLoading,
    errorMessage,
  }
}

export default useChildOfWorkOrderDelete
