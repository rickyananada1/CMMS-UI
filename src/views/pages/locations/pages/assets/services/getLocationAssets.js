import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getLocationAssets = async ({ id, params, signal }) => {
  return await axios.get(`/location/${id}/assets`, { id, params, signal })
}

const useGetLocationAssetsTableList = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['locations-assets', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getLocationAssets({ id, params, signal }),
  })
}

export { getLocationAssets, useGetLocationAssetsTableList }
