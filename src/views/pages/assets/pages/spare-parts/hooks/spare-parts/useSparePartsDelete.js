import { useState } from 'react'
import { useDeleteSpareParts } from '../../services/spare-parts/deleteSpareParts'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'

const useSparePartsDelete = ({ setAction }) => {
  const Notification = withReactContent(Swal)
  const initialValue = { sparepart_ids: [] }
  const [textFields, setTextFields] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const deleteSpareParts = useDeleteSpareParts()

  const selectedRow = useSelector((state) => state.assets?.selectedAsset)

  const setChange = (index, event) => {
    const updatedTextFields = [...textFields]
    updatedTextFields[index].quantity = event.target.value
    setTextFields(updatedTextFields)
  }

  const setFieldValue = (event) => {
    setTextFields({ ...textFields, sparepart_ids: [event.value] })
  }

  const handleDeleteSpareParts = async () => {
    Notification.fire({
      icon: 'warning',
      text: 'Are you sure to delete ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true)
        await deleteSpareParts
          .mutateAsync({
            data: textFields,
            id: selectedRow?.asset_id,
          })
          .then((response) => {
            if (response?.status === 200) {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Spare parts deleted successfully.`,
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
    })
  }

  return {
    isLoading,
    textFields,
    initialValue,
    setTextFields,
    setChange,
    setFieldValue,
    handleDeleteSpareParts,
    errorMessage,
  }
}

export default useSparePartsDelete
