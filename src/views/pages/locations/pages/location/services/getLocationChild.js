import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getLocationChild = async ({ id, params, signal }) => {
  return await axios.get(`/location/${id}/child`, { params, signal })
}

const useGetLocationChild = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['location-child', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getLocationChild({ id, params, signal }),
  })
}

export { getLocationChild, useGetLocationChild }
