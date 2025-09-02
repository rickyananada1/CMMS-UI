import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getSubassemblies = async ({ id, params, signal }) => {
  return await axios.get(`/assets/subassemblies/${id}`, { params, signal })
}

const useGetSubassemblies_ = ({ id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => getSubassemblies({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetSubassemblies = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['subassemblies', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getSubassemblies({ id, params, signal }),
  })
}

export { getSubassemblies, useGetSubassemblies, useGetSubassemblies_ }
