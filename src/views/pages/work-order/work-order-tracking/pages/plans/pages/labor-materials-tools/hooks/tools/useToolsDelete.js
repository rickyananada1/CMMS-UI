import { useState } from 'react'
import { useDeleteTools, useGetToolList } from '../../services/tools'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

const useToolsDelete = ({ setAction }) => {
  const Notification = withReactContent(Swal)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const selectedTaskRow = useSelector((state) => state.woTask?.selectedGroup)

  const [textFields, setTextFields] = useState({
    work_order_tool_id: null,
  })

  const getToolsListService = useGetToolList({
    id: selectedTaskRow?.work_order_task_id,
  })

  const deleteTools = useDeleteTools({
    id: selectedTaskRow?.work_order_task_id,
    tool_id: textFields?.work_order_tool_id?.value,
  })

  const handleDeleteTools = async (values) => {
    setIsLoading(true)
    await deleteTools
      .mutateAsync({
        id: selectedTaskRow?.work_order_task_id,
        tool_id: values?.work_order_tool_id?.value,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Tools deleted successfully.`,
          }).then(() => {
            setTextFields({
              work_order_tool_id: null,
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
    getToolsListService,
    handleDeleteTools,
  }
}

export default useToolsDelete
