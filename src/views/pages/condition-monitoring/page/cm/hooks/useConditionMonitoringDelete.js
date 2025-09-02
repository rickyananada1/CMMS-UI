import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDeleteCM, useGetCMDropdown } from '../services'

const useConditionMonitoringDelete = ({ setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)
  const deleteConditionMonitoring = useDeleteCM()
  const getConditionMonitoringDropdown = useGetCMDropdown()

  const [formValue, setFormValue] = useState({
    condition_monitoring_ids: [],
  })

  const setDeleteCMValue = (selectedValues) => {
    setFormValue((prev) => ({
      ...prev,
      condition_monitoring_ids: selectedValues,
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
        const newValues = values.condition_monitoring_ids.map((item) => item.value)
        await deleteConditionMonitoring
          .mutateAsync({
            data: {
              condition_monitoring_ids: newValues,
            },
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: `Deleted data successfully`,
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
    setDeleteCMValue,
    handleDelete,
    getConditionMonitoringDropdown,
  }
}

export default useConditionMonitoringDelete
