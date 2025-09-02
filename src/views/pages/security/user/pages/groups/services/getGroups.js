import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getGroups = async ({ id, params, signal }) => {
  return await axios.get('/users/' + id + '/security-group', { params, signal })
}

const useGetGroups = (props) => {
  return useMutation({
    mutationFn: getGroups,
    ...props?.config,
  })
}

export { getGroups, useGetGroups }
