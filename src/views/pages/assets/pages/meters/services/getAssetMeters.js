import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getAssetMeters = async ({ params, signal }) => {
  return await axios.get('/asset-meter', { params, signal })
}

const useGetAssetMeters = ({ params, config }) => {
  return useQuery({
    ...config,
    queryKey: ['asset-meters-list', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getAssetMeters({ params, signal }),
  })
}

export { getAssetMeters, useGetAssetMeters }
