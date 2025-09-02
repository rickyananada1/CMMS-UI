import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getMeterAssets = async ({ id, params, signal }) => {
  return await axios.get(`/meters/${id}/assets`, { id, params, signal })
}

const useGetMeterAssets = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['meter-assets', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getMeterAssets({ id, params, signal }),
  })
}

export { getMeterAssets, useGetMeterAssets }
