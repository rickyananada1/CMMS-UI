import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getLocationMeters = async ({ params, signal }) => {
  return await axios.get('/location-meter', { params, signal })
}

const useGetLocationMeters = ({ params, config }) => {
  return useQuery({
    ...config,
    queryKey: ['location-meters-list', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getLocationMeters({ params, signal }),
  })
}

export { getLocationMeters, useGetLocationMeters }
