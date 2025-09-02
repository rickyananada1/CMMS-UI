import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getUsers = async ({ id, params, signal }) => {
  return await axios.get(`/security-groups/${id}/users`, { params, signal })
}

const useGetUsers = ({ id, config, params }) => {
  return useQuery({
    ...config,
    queryKey: ['security-group-users', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getUsers({ id, params, signal }),
  })
}
export { getUsers, useGetUsers }
