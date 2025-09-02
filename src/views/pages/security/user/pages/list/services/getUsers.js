import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getUsers = async ({ params, signal }) => {
  return await axios.get('/users', { params, signal })
}

const useGetUsers = ({ config, params }) => {
  return useQuery({
    ...config,
    queryKey: ['security-users', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getUsers({ params, signal }),
  })
}
export { getUsers, useGetUsers }
