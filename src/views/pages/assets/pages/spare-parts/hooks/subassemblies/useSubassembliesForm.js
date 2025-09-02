import { useEffect, useState } from 'react'
import { useGetSubassembliesOption, useUpdateSubassemblies } from '../../services/subassemblies'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'
import useSubassembliesDelete from './useSubassembliesDelete'

const useSubassembliesForm = ({ setAction }) => {
  const Notification = withReactContent(Swal)
  const getSubassembliesOption = useGetSubassembliesOption()
  const [totalPage, setTotalPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState([])
  const [isAnyChange, setIsAnyChange] = useState(false)
  const { handleDeleteSubassemblies } = useSubassembliesDelete({ setAction })
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)
  const selectedSubassembliesRow = useSelector((state) => state.subassemblies?.selectedGroup)

  const initialValue = [
    {
      parent_id: selectedRow?.asset_id,
      asset_id: selectedSubassembliesRow?.asset_id,
      asset_description: selectedSubassembliesRow?.asset_description,
    },
  ]
  const [textFields, setTextFields] = useState(initialValue)

  const handleAddTextField = () => {
    const newTextField = {
      parent_id: selectedRow?.asset_id,
      asset_id: null,
      asset_description: null,
    }
    setTextFields([...textFields, newTextField])
  }

  const handleRemoveTextField = (index) => {
    const updatedTextFields = textFields.filter((_, i) => i !== index)
    setTextFields(updatedTextFields)
  }

  const setChange = (index = 0, event) => {
    const updatedTextFields = [...textFields]
    updatedTextFields[index].quantity = parseInt(event.target.value)
    setTextFields(updatedTextFields)
  }

  const setFieldValue = (index = 0, event) => {
    const updatedTextFields = [...textFields]
    const parent = data
      .filter((item) => item.asset_id === event.value)
      .map((obj) => obj.parent_id)
      .join(', ')
    if (parent !== '') {
      Notification.fire({
        icon: 'warning',
        title: 'Warning!',
        text: `Asset already has parent.`,
      }).then(() => {
        setIsSubmitting(false)
      })
      updatedTextFields[index].asset_description = ''
      updatedTextFields[index].asset_id = null
    } else {
      updatedTextFields[index].asset_id = event.value

      updatedTextFields[index].asset_description = data
        .filter((item) => item.asset_id === event.value)
        .map((obj) => obj.asset_description)
        .join(', ')

      setTextFields(updatedTextFields)
    }
  }

  const setField = (event) => {
    console.log(event)
  }

  const getSubassembliesOptionList = async (params) => {
    setIsLoading(true)
    await getSubassembliesOption
      .mutateAsync({
        data: textFields,
      })
      .then((response) => {
        if (response?.status === 200) {
          if (Array.isArray(response?.data?.data) && response?.data?.data?.length) {
            let responseData = response?.data
            setData(responseData?.data)
            setTotalPage(responseData?.data.filter((item) => item.parent_id === null).length)
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

  const updateSubassemblies = useUpdateSubassemblies()

  const hasNull = (array, objectKey) => {
    let hasNullKey = false
    for (let i = 0; i < array.length; i++) {
      if (array[i][objectKey] === null) {
        hasNullKey = true
        break
      }
    }
    return hasNullKey
  }

  const hasSameKey = (array) => {
    let hasSameKey = false
    for (let i = 0; i < array.length; i++) {
      if (array[i].parent_id === array[i].asset_id) {
        hasSameKey = true
        break
      }
    }
    return hasSameKey
  }

  const handleUpdateSubassemblies = async () => {
    setIsSubmitting(true)
    if (hasNull(textFields, 'asset_id') === true) {
      Notification.fire({
        icon: 'error',
        title: 'Error!',
        text: `There is asset that already has parent or same as parent asset.`,
      }).then(() => {
        setIsSubmitting(false)
      })
    } else if (hasSameKey(textFields)) {
      Notification.fire({
        icon: 'error',
        title: 'Error!',
        text: `Subassemblies can not be the same as parent asset.`,
      }).then(() => {
        setIsSubmitting(false)
      })
    } else {
      for (let i = 0; i < textFields.length; i++) {
        delete textFields[i].asset_description
      }
      const json = textFields
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
          await updateSubassemblies
            .mutateAsync({
              data: json,
            })
            .then((response) => {
              if (response?.status === 200) {
                handleDeleteSubassemblies({ ids: [selectedSubassembliesRow?.asset_id] })
                Notification.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: `Subassemblies updated successfully.`,
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
  }

  const handlePageChange = (page) => {
    getSubassembliesOptionList({ q: search, page: page, limit: limit })
    setPage(page)
  }

  const handlePerRowsChange = (newPerPage, page) => {
    getSubassembliesOptionList({ q: search, page: page, limit: newPerPage })
    setPage(page)
    setLimit(newPerPage)
  }

  useEffect(() => {
    getSubassembliesOptionList({ q: search, page: page, limit: limit })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getSubassembliesOptionList({ q: search, page: page, limit: limit })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, setSearch])

  return {
    data,
    isLoading,
    isSubmitting,
    errorMessage,
    totalPage,
    getSubassembliesOption,
    textFields,
    initialValue,
    handlePageChange,
    handlePerRowsChange,
    setTextFields,
    handleAddTextField,
    handleRemoveTextField,
    setChange,
    setFieldValue,
    handleUpdateSubassemblies,
    setField,
    selectedRow,
    hasNull,
    isAnyChange,
    setIsAnyChange,
  }
}

export default useSubassembliesForm
