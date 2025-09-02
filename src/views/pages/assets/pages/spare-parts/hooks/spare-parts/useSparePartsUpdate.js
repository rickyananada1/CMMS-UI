import { useState } from 'react'
import { useGetSpareParts_, useUpdateSpareParts } from '../../services/spare-parts'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'

const useSparePartsUpdate = ({ setAction }) => {
  const Notification = withReactContent(Swal)
  const [totalPage] = useState(0)
  const [page] = useState(1)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [data] = useState([])
  const initialValue = [{ sparepart_id: '', remark: '', quantity: '', description: '' }]
  const [textFields, setTextFields] = useState(initialValue)
  const [textFieldsLabel, setTextFieldsLabel] = useState(initialValue)
  const [isAnyChange, setIsAnyChange] = useState(false)

  const selectedRow = useSelector((state) => state.assets?.selectedAsset)

  const getSpareParts = useGetSpareParts_({
    id: selectedRow?.asset_id,
  })

  const handleAddTextField = () => {
    const newTextField = { sparepart_id: '', remark: '', quantity: '', description: '' }
    setTextFields([...textFields, newTextField])
  }

  const handleRemoveTextField = (index) => {
    const updatedTextFields = textFields.filter((_, i) => i !== index)
    setTextFields(updatedTextFields)
  }

  const setChange = (index, event) => {
    const updatedTextFields = [...textFields]
    updatedTextFields[index].quantity = parseInt(event.target.value)
    setTextFields(updatedTextFields)
  }

  const setFieldValue = (index, event) => {
    const updatedTextFields = [...textFields]
    updatedTextFields[index].sparepart_id = event.value

    updatedTextFields[index].description = data
      .filter((item) => item.sparepart_id === event.value)
      .map((obj) => obj.description)
      .join(', ')

    updatedTextFields[index].quantity = parseInt(
      data
        .filter((item) => item.sparepart_id === event.value)
        .map((obj) => obj.quantity)
        .join(', '),
    )

    setTextFields(updatedTextFields)
    setTextFieldsLabel(updatedTextFields)
  }

  const setField = (event) => {
    console.log(event)
  }

  const updateSpareParts = useUpdateSpareParts()

  const handleUpdateSpareParts = async () => {
    Notification.fire({
      icon: 'info',
      text: 'Are you sure to submit ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsSubmitting(true)
        await updateSpareParts
          .mutateAsync({
            data: textFields,
            id: selectedRow?.asset_id,
          })
          .then((response) => {
            if (response?.status === 200) {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Spare parts updated successfully.`,
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
    })
  }

  return {
    data,
    isLoading,
    isSubmitting,
    search,
    page,
    errorMessage,
    totalPage,
    setSearch,
    getSpareParts,
    textFields,
    textFieldsLabel,
    initialValue,
    setTextFields,
    handleAddTextField,
    handleRemoveTextField,
    setChange,
    setFieldValue,
    handleUpdateSpareParts,
    setField,
    selectedRow,
    isAnyChange,
    setIsAnyChange,
  }
}

export default useSparePartsUpdate
