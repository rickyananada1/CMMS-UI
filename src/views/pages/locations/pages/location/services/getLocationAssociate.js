import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getLocationAssociate = async ({ id, params, signal }) => {
  return await axios.get(`/location/${id}/associates`, { params, signal })
}

const useGetLocationAssociate = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['location-associate', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getLocationAssociate({ id, params, signal }),
  })
}

export { getLocationAssociate, useGetLocationAssociate }
