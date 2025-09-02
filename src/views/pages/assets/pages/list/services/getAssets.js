import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getAssets = async ({ params, signal }) => {
  return await axios.get(`/assets`, {
    params,
    signal,
  })
}

const useGetAssets = ({ config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['assets-list', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getAssets({ params, signal }),
  })
}

export { getAssets, useGetAssets }
