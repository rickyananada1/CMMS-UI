import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDeleteFailureCode, useGetFailureCodeList } from '../services'
import { useSelector } from 'react-redux'

const useFailureCodeDelete = ({ setAction, setTabIndex, setVisible }) => {
  const Notification = withReactContent(Swal)
  const selectedRow = useSelector((state) => state.failureCodes?.selectedFailureCode)

  const [formValue, setFormValue] = useState({
    failure_class: null,
  })

  const listFailureCodeService = useGetFailureCodeList()

  const deleteFailureCodeService = useDeleteFailureCode({
    id: selectedRow?.failure_code_id,
  })

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
        await deleteFailureCodeService
          .mutateAsync({
            id: values?.failure_class?.value,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: 'Failure Codes deleted successfully.',
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
            setFormValue({
              failure_class: null,
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
    selectedRow,
    handleDelete,
    listFailureCodeService,
  }
}

export default useFailureCodeDelete
