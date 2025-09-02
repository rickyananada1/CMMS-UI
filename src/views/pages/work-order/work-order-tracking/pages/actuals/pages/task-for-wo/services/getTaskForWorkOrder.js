import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getTaskForWorkOrder = async ({ id, params, signal }) => {
  return await axios.get(`/work-orders/${id}/task-actuals`, { params, signal })
}

const useGetTaskForWorkOrder_ = ({ id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => getTaskForWorkOrder({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetTaskForWorkOrder = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['work-order', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getTaskForWorkOrder({ id, params, signal }),
  })
}

export { getTaskForWorkOrder, useGetTaskForWorkOrder_, useGetTaskForWorkOrder }
