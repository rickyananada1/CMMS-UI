import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getLabor = async ({ id, params, signal }) => {
  return await axios.get(`/work-orders/${id}/tasks`, { params, signal })
}

const getLaborList = async ({ id, params, signal }) => {
  return await axios.get(`/work-orders/tasks/${id}/labors`, { params, signal })
}

const getDetailLabor = async ({ id, labor_id, params, signal }) => {
  return await axios.get(`/work-orders/tasks/${id}/labors/${labor_id}`, { params, signal })
}

const useGetLabor_ = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => getLabor({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetLaborList = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => getLaborList({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetLabor = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'work-order-plan-labor',
      id,
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getLaborList({ id, params, signal }),
  })
}

const useGetDetailLabor = ({ id, labor_id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => getDetailLabor({ id, labor_id, params, mutationProps }),
    ...config,
  })
}

export { getLabor, useGetLabor_, useGetLabor, getDetailLabor, useGetDetailLabor, useGetLaborList }
