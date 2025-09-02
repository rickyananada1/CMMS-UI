import { useNavigate, useSearchParams } from 'react-router-dom'
import { useChangePasswordService, useGetProfileData } from '../services'
import { useEffect, useState } from 'react'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useSignout } from '../../login/services'
import { resetAllSlices } from 'src/store'
import axios from 'src/libs/axios'

const useChangePassword = () => {
  const navigate = useNavigate()
  const Notification = withReactContent(Swal)
  const [errorMessage, setErrorMessage] = useState('')
  const [profileData, setProfileData] = useState({})

  const [queryParameters] = useSearchParams()
  const userToken = queryParameters.get('token')

  const getProfileDataService = useGetProfileData()
  const getProfileData = async (params) => {
    // setIsLoading(true)
    await getProfileDataService
      .mutateAsync({
        token: userToken,
        params: params,
      })
      .then((res) => {
        if (res.status === 200) {
          setProfileData(res.data.data)
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        Notification.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Reset Password URL expired or invalid!',
        })
        navigate('../')
      })
      .finally(() => {
        // setIsLoading(false)
      })
  }

  const userType = (type) => {
    switch (type) {
      case 1:
        return 'Daily User'
      case 2:
        return 'Secondary User'
      case 3:
        return 'Requester User'
      case 4:
        return 'Admin'
      case 5:
        return 'Super Admin'
      default:
        return '-'
    }
  }

  useEffect(() => {
    if (!userToken) {
      // notification.error('Reset Password URL not valid')
      navigate('../')
    }
    getProfileData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken])

  const formValue = {
    password: '',
    confirmPassword: '',
  }

  const signout = useSignout()

  const handleLogout = async () => {
    await signout
      .mutateAsync({ data: null })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem('access_token')
          axios.defaults.headers.common['Authorization'] = ``
          resetAllSlices()
          navigate('/')
        } else {
          console.error('Something wrong!')
        }
      })
      .catch((err) => {
        console.error(err.response.data)
      })
  }

  const changePasswordService = useChangePasswordService()
  const handleSubmit = async (values, formikHelpers) => {
    const modifiedFormData = { token: userToken, new_password: values.password }

    await changePasswordService
      .mutateAsync({
        data: modifiedFormData,
      })
      .then(async (res) => {
        await handleLogout()

        Notification.fire({
          icon: 'success',
          title: 'Success!',
          text: `Your password has been changed!`,
        }).then(() => {
          navigate('../')
        })
      })
      .catch((err) => {
        Notification.fire({
          icon: 'error',
          title: 'Error!',
          text: err.response.data.message,
        })
        setErrorMessage(err.response.data.message)
      })
      .finally(() => {
        formikHelpers.setSubmitting(false)
      })
  }

  return {
    profileData,
    formValue,
    handleSubmit,
    errorMessage,
    userType,
  }
}

export default useChangePassword
