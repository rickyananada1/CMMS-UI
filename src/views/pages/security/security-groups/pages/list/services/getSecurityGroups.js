import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getSecurityGroups = async ({ params, signal }) => {
  return await axios.get('/security-groups', { params, signal })
}

const useGetSecurityGroups = ({ config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['security-groups', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getSecurityGroups({ params, signal }),
  })
}

export { getSecurityGroups, useGetSecurityGroups }
