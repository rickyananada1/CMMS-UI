import { useState } from 'react'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useChangePasswordService } from 'src/views/pages/profile/services'

const useChangePassword = ({ setVisible }) => {
  const Notification = withReactContent(Swal)
  const [errorMessage, setErrorMessage] = useState('')

  const [formValue, setFormValue] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const changePasswordService = useChangePasswordService()

  const handleSubmit = async (values, formikHelpers) => {
    const formattedValues = {
      old_password: values.oldPassword,
      new_password: values.newPassword,
      confirm_password: values.confirmPassword,
    }
    await changePasswordService
      .mutateAsync({
        data: formattedValues,
      })
      .then((res) => {
        Notification.fire({
          icon: 'success',
          title: 'Success!',
          text: `Password changed successfully.`,
        }).then(() => {
          setFormValue({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
          })
          setVisible(false)
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
    formValue,
    handleSubmit,
    errorMessage,
  }
}

export default useChangePassword
