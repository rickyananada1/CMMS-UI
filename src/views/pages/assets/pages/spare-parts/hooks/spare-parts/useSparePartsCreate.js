import { useEffect, useState } from 'react'
import { useCreateSpareParts, useGetSparePartsOption } from '../../services/spare-parts'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'

const useSparePartsCreate = ({ setAction }) => {
  const Notification = withReactContent(Swal)
  const getSparePartsOption = useGetSparePartsOption()
  const [totalPage, setTotalPage] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState([])
  const initialValue = [{ sparepart_id: '', remark: '', quantity: '', description: '' }]
  const [textFields, setTextFields] = useState(initialValue)
  const [textFieldsLabel, setTextFieldsLabel] = useState(initialValue)
  const [isAnyChange, setIsAnyChange] = useState(false)

  const selectedRow = useSelector((state) => state.assets?.selectedAsset)

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

  const setFieldValue = (index, event, data) => {
    const updatedTextFields = [...textFields]
    updatedTextFields[index].sparepart_id = event.value

    updatedTextFields[index].description = data
      .filter((item) => item.sparepart_id === event.value)
      .map((obj) => obj.description)
      .join(', ')

    setTextFields(updatedTextFields)
    setTextFieldsLabel(updatedTextFields)
  }

  const setField = (event) => {
    console.log(event)
  }

  const getSparePartsOptionList = async () => {
    setIsLoading(true)
    await getSparePartsOption
      .mutateAsync({
        data: textFields,
      })
      .then((response) => {
        if (response?.status === 200) {
          if (Array.isArray(response?.data?.data) && response?.data?.data?.length) {
            let responseData = response?.data
            setData(responseData?.data)
            setTotalPage(responseData?.total)
          }
        }
      })
      .catch((err) => {
        setErrorMessage(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const createSpareParts = useCreateSpareParts()

  const hasNull = (array, objectKey) => {
    let hasNullKey = false
    for (let i = 0; i < array.length; i++) {
      if (array[i][objectKey] === '') {
        hasNullKey = true
        break
      }
    }
    return hasNullKey
  }

  const handleCreateSpareParts = async () => {
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
        await createSpareParts
          .mutateAsync({
            data: textFields,
            id: selectedRow?.asset_id,
          })
          .then((response) => {
            if (response?.status === 200) {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Spare parts added successfully.`,
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

  const handlePageChange = (page) => {
    getSparePartsOptionList({ q: search, page: page, limit: limit })
    setPage(page)
  }

  const handlePerRowsChange = (newPerPage, page) => {
    getSparePartsOptionList({ q: search, page: page, limit: newPerPage })
    setPage(page)
    setLimit(newPerPage)
  }

  useEffect(() => {
    getSparePartsOptionList({ q: search, page: page, limit: limit })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getSparePartsOptionList({ q: search, page: page, limit: limit })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, setSearch])

  return {
    data,
    isLoading,
    isSubmitting,
    search,
    page,
    errorMessage,
    totalPage,
    setSearch,
    handlePageChange,
    handlePerRowsChange,
    getSparePartsOption,
    textFields,
    textFieldsLabel,
    initialValue,
    setTextFields,
    handleAddTextField,
    handleRemoveTextField,
    setChange,
    setFieldValue,
    handleCreateSpareParts,
    setField,
    selectedRow,
    hasNull,
    isAnyChange,
    setIsAnyChange,
  }
}

export default useSparePartsCreate
