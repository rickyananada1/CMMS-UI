import { useState } from 'react'
import { useDeleteSubassemblies } from '../../services/subassemblies'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'

const useSubassembliesDelete = ({ setAction }) => {
  const Notification = withReactContent(Swal)
  const initialValue = { ids: [] }
  const [textFields, setTextFields] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const deleteSubassemblies = useDeleteSubassemblies()

  const selectedRow = useSelector((state) => state.assets?.selectedAsset)

  const setSubassenbliesFieldValue = (event) => {
    setTextFields({ ...textFields, ids: [event.value] })
  }

  const handleDeleteSubassemblies = async (prop) => {
    setIsLoading(true)
    await deleteSubassemblies
      .mutateAsync({
        data: prop !== undefined ? prop : textFields,
        id: selectedRow?.asset_id,
      })
      .then((response) => {
        if (response?.status === 200 && !prop) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Subassemblies deleted successfully.`,
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
          setIsLoading(false)
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    isLoading,
    textFields,
    initialValue,
    setTextFields,
    setSubassenbliesFieldValue,
    handleDeleteSubassemblies,
    errorMessage,
    selectedRow,
  }
}

export default useSubassembliesDelete
