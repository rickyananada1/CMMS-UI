import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDeleteLocation as useDeleteLocationServices, useGetListLocation } from '../services'

const useDeleteLocation = ({ setAction, setTabIndex, setVisible }) => {
  const Notification = withReactContent(Swal)
  const [formValue, setFormValue] = useState({
    location_id: null,
  })

  const listLocationService = useGetListLocation()

  const deleteLocationService = useDeleteLocationServices()

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
        await deleteLocationService
          .mutateAsync({
            id: values?.location_id?.value,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: 'Location deleted successfully.',
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
            setFormValue({
              location_id: null,
            })
            setTabIndex(0)
            setAction('Read')
            setVisible(false)
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Oops...!',
              text: err?.response?.data?.message,
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
    handleDelete,
    listLocationService,
  }
}

export default useDeleteLocation
