import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getSecurityProfile = async ({ user_id, group_id, params, signal }) => {
  return await axios.get(
    '/users/' + user_id + '/security-group/' + group_id + '/security-profile',
    {
      params,
      signal,
    },
  )
}

const useGetSecurityProfile = (props) => {
  return useMutation({
    mutationFn: getSecurityProfile,
    ...props?.config,
  })
}

export { getSecurityProfile, useGetSecurityProfile }
