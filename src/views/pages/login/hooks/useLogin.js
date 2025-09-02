import { useLocation, useNavigate } from 'react-router-dom'
import { useSignin, useSignout, useGetProfile, useGetPermissions } from '../services'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from 'src/store/actions'
import { resetAllSlices } from 'src/store'
import axios from 'src/libs/axios'

const useLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [errorMessage, setErrorMessage] = useState('')

  const formValue = {
    username: '',
    password: '',
  }

  const signin = useSignin()
  const signout = useSignout()
  const profile = useGetProfile()
  const permissions = useGetPermissions()

  const handleGetPermissions = async () => {
    await permissions
      .mutateAsync({})
      .then((res) => {
        const permissions = res.data?.data || []
        dispatch(authActions.setPermissions(permissions))
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message)
      })
  }

  const handleGetProfile = async () => {
    await profile
      .mutateAsync({})
      .then((res) => {
        const dataUser = res.data?.data
        dispatch(authActions.setUser(dataUser))
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message)
      })
  }

  const handleSubmit = async (values, formikHelpers) => {
    await signin
      .mutateAsync({
        data: values,
      })
      .then(async (res) => {
        const accessToken = res?.data?.token
        if (accessToken) {
          localStorage.setItem('access_token', `Bearer ${accessToken}`)
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

          await Promise.all([handleGetProfile(), handleGetPermissions()]).then(() => {
            navigate(location?.state?.redirect || '/page/dashboard')
          })
        } else {
          setErrorMessage('Something wrong in token!')
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
      })
      .finally(() => {
        formikHelpers.setSubmitting(false)
      })
  }

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

  return {
    formValue,
    handleSubmit,
    handleLogout,
    errorMessage,
  }
}

export default useLogin
