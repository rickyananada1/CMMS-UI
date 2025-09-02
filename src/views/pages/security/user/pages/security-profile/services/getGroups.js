import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getGroups = async ({ user_id, params, signal }) => {
  return await axios.get('/users/' + user_id + '/security-group', { params, signal })
}

const useGetGroups = (props) => {
  return useMutation({
    mutationFn: getGroups,
    ...props?.config,
  })
}

export { getGroups, useGetGroups }
