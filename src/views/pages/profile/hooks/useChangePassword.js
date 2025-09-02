import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useChangePasswordService } from '../services'

const useChangePassword = () => {
  const Notification = withReactContent(Swal)
  const [errorMessage, setErrorMessage] = useState('')

  const [formValue, setFormValue] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  })

  const changePasswordService = useChangePasswordService()

  const handleSubmit = async (values, formikHelpers) => {
    await changePasswordService
      .mutateAsync({
        data: values,
      })
      .then((res) => {
        Notification.fire({
          icon: 'success',
          title: 'Success!',
          text: `Password changed successfully.`,
        }).then(() => {
          setFormValue({
            old_password: '',
            new_password: '',
            confirm_password: '',
          })
        })
      })
      .catch((err) => {
        Notification.fire({
          icon: 'error',
          title: 'Error!',
          text: `${err.response.data.message}`,
        }).then(() => {
          setErrorMessage(err.response.data.message)
        })
      })
      .finally(() => {
        formikHelpers.setSubmitting(false)
      })
  }

  return {
    errorMessage,
    formValue,
    handleSubmit,
  }
}

export default useChangePassword
