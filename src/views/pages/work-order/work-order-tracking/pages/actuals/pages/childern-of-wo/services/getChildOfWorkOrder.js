import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getChildOfWorkOrder = async ({ id, params, signal }) => {
  return await axios.get(`/work-orders/${id}/plan-actuals`, { params, signal })
}

const useGetChildOfWorkOrder_ = ({ id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => getChildOfWorkOrder({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetChildOfWorkOrder = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['work-order', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getChildOfWorkOrder({ id, params, signal }),
  })
}

export { getChildOfWorkOrder, useGetChildOfWorkOrder_, useGetChildOfWorkOrder }
