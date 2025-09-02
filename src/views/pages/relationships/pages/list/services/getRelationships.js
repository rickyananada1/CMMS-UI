import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getRelationships = async ({ params, signal }) => {
  return await axios.get(`/asset/relation`, { params, signal })
}

const useGetListRelationships = ({ config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['relationships', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getRelationships({ params, signal }),
  })
}

export { getRelationships, useGetListRelationships }
