import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getSpareParts = async ({ id, params, signal }) => {
  return await axios.get(`/asset/sparepart/${id}`, { params, signal })
}

const useGetSpareParts_ = ({ id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => {
      const { id: _, ...rest } = mutationProps
      return getSpareParts({ id, params, ...rest })
    },
    ...config,
  })
}

const useGetSpareParts = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['sparepart', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getSpareParts({ id, params, signal }),
  })
}

export { getSpareParts, useGetSpareParts, useGetSpareParts_ }
