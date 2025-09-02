import { useNavigate } from 'react-router-dom'
import { useForgotPass } from '../services'
import { useState } from 'react'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

const useForgotPassword = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const Notification = withReactContent(Swal)
  const formValue = {
    email: '',
  }

  const forgotPassService = useForgotPass()
  const handleSubmit = async (values, formikHelpers) => {
    await forgotPassService
      .mutateAsync({
        data: values,
      })
      .then((res) => {
        Notification.fire({
          icon: 'success',
          title: 'Success!',
          text: `Please check your email for your password reset instructions!`,
        }).then(() => {
          navigate('../')
        })
      })
      .catch((err) => {
        setErrorMessage(
          err.response.status === 422 ? 'Invalid Email/Username!' : err.response.data.message,
        )
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

export default useForgotPassword
