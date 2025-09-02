import { useState } from 'react'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { useDeleteFailureReporting, useGetFailureReportingList_ } from '../services'

const useFailureReportingDelete = ({ setAction }) => {
  const Notification = withReactContent(Swal)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const selectedRow = useSelector((state) => state.quickReporting?.selectedWorkOrder)

  const [textFields, setTextFields] = useState({
    work_order_failure_id: null,
  })

  const getFailureReportingListService = useGetFailureReportingList_({
    id: selectedRow?.work_order_id,
  })

  const deleteFailureReporting = useDeleteFailureReporting({
    id: selectedRow?.work_order_id,
    failure_id: textFields?.work_order_failure_id?.value,
  })

  const handleDeleteFailureReporting = async (values) => {
    setIsLoading(true)
    await deleteFailureReporting
      .mutateAsync({
        id: selectedRow?.work_order_id,
        failure_id: values?.work_order_failure_id?.value,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Failure Reporting deleted successfully.`,
          }).then(() => {
            setTextFields({
              work_order_failure_id: null,
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
    handleDeleteFailureReporting,
    selectedRow,
    getFailureReportingListService,
  }
}

export default useFailureReportingDelete
