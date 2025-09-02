import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const changePassword = async ({ data, signal }) => {
  return await axios.post('/auth/change-password', data, {
    signal,
  })
}

const useChangePasswordService = (props) => {
  return useMutation({
    mutationFn: changePassword,
    ...props?.config,
  })
}

const getProfileData = async ({ token, data, signal }) => {
  return await axios.get('/auth/profile/' + token, data, {
    signal,
  })
}

const useGetProfileData = (props) => {
  return useMutation({
    mutationFn: getProfileData,
    ...props?.config,
  })
}

export { getProfileData, useGetProfileData, changePassword, useChangePasswordService }
