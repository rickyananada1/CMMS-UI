import { useState } from 'react'
import { useDeleteRelation, useGetRelationDropdown } from '../services'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useAssetsRelationDelete = ({ setAction, setTabIndex, setVisible, initialVisible }) => {
  const Notification = withReactContent(Swal)
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)

  const getAssetRelationDropdown = useGetRelationDropdown({
    id: selectedRow?.asset_id,
  })
  const deleteRelation = useDeleteRelation()

  const [formValue, setFormValue] = useState({
    asset_relation_ids: [],
  })

  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const setRelationFieldValue = (selectedValues) => {
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      asset_relation_ids: selectedValues,
    }))
  }

  const handleDelete = async (values, formikHelpers) => {
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
        const newValues = values.asset_relation_ids.map((item) => item.value)
        await deleteRelation
          .mutateAsync({
            data: {
              asset_relation_ids: newValues,
            },
            id: selectedRow?.asset_id,
          })
          .then((response) => {
            if (response?.status === 200) {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Relation deleted successfully.`,
              }).then(() => {
                setTabIndex(5)
                setAction('Read')
                formikHelpers.resetForm()
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
            formikHelpers.setSubmitting(false)
            setIsLoading(false)
          })
      }
    })
  }

  return {
    isLoading,
    formValue,
    setRelationFieldValue,
    handleDelete,
    errorMessage,
    getAssetRelationDropdown,
  }
}

export default useAssetsRelationDelete
