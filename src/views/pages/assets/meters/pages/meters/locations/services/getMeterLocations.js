import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getMeterLocations = async ({ id, params, signal }) => {
  return await axios.get(`/meters/${id}/locations`, { id, params, signal })
}

const useGetMeterLocations = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['meter-locations', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getMeterLocations({ id, params, signal }),
  })
}

export { getMeterLocations, useGetMeterLocations }
