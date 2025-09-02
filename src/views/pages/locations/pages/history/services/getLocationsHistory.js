import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getLocationsHistory = async ({ id, params, signal }) => {
  return await axios.get(`/locations/${id}/history`, { params, signal })
}

const useGetLocationsHistory = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['locations-history', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getLocationsHistory({ id, params, signal }),
  })
}

export { getLocationsHistory, useGetLocationsHistory }
