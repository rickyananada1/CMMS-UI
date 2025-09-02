import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useGetMetersSelect } from '../services'
import { useDeleteMeter as useDeleteMeterService } from '../../detail/services'

const useDeleteMeter = ({ setVisible, tableRef }) => {
  const Notification = withReactContent(Swal)
  const [formValue, setFormValue] = useState({
    meter_id: null,
    meter_in_group_ids: [null],
  })

  const getMeters = useGetMetersSelect()

  const deleteMeterService = useDeleteMeterService()

  const handleDelete = async (values, formikHelpers) => {
    Notification.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Do you want to delete ${values?.meter_id?.label}?`,
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteMeterService
          .mutateAsync({
            id: values?.meter_id?.value,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: 'Meter deleted successfully.',
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
            setFormValue({
              meter_group_id: null,
            })
            tableRef?.current?.update()
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
    getMeters,
  }
}

export default useDeleteMeter
