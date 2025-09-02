import { useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { useGetAssetDropdown, useGetLocationDropdown, useMoveAsset } from '../services'
import withReactContent from 'sweetalert2-react-content'

const useMoveModifyAsset = ({ setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)

  const moveAsset = useMoveAsset()
  const getAssetDropdown = useGetAssetDropdown()
  const getLocationDropdown = useGetLocationDropdown()

  const [formValue] = useState({
    parent_id: null,
    location_id: null,
  })

  const handleMove = async (values, formikHelpers) => {
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
        const newValues = {
          parent_id: values.parent_id?.value ? values.parent_id?.value : null,
          location_id: values.location_id?.value ? values.location_id?.value : null,
        }

        await moveAsset
          .mutateAsync({
            id: selectedRow?.asset_id,
            data: newValues,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: 'Move asset successfully',
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            }).then(() => {
              setTabIndex(0)
              setAction('Read')
            })
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Oops...!',
              text: err.response.data.message,
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
          })
          .finally(() => {
            formikHelpers.setSubmitting(false)
          })
      }
    })
  }

  return {
    formValue,
    handleMove,
    Notification,
    getAssetDropdown,
    getLocationDropdown,
  }
}

export default useMoveModifyAsset
