import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getLocations = async ({ params, signal }) => {
  return await axios.get('/location', { params, signal })
}

const useGetLocations = ({ config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['locations', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getLocations({ params, signal }),
  })
}

export { getLocations, useGetLocations }
