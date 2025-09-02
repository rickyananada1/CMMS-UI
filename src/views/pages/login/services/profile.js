import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getProfile = async ({ signal }) => {
  return await axios.get('/me', {
    signal,
  })
}

const useGetProfile = (props) => {
  return useMutation({
    mutationFn: getProfile,
    ...props?.config,
  })
}

const useGetProfile_ = ({ params, config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['profile-me', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getProfile({ params, signal }),
  })
}

const getPermissions = async ({ signal }) => {
  return await axios.get('/users/permissions', {
    signal,
  })
}

const useGetPermissions = (props) => {
  return useMutation({
    mutationFn: getPermissions,
    ...props?.config,
  })
}

export { getProfile, useGetProfile, getPermissions, useGetPermissions, useGetProfile_ }
