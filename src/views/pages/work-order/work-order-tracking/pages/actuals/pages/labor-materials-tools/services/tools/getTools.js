import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getTools = async ({ id, params, signal }) => {
  return await axios.get(`/work-orders/${id}/tasks`, { params, signal })
}

const getToolsList = async ({ id, params, signal }) => {
  return await axios.get(`/work-orders/tasks/${id}/tool-actuals`, { params, signal })
}

const getDetailTools = async ({ id, tool_actual_id, params, signal }) => {
  return await axios.get(`/work-orders/tasks/${id}/tool-actuals/${tool_actual_id}`, {
    params,
    signal,
  })
}

const useGetTools_ = ({ id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => getTools({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetTools = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'work-order-plan-tools',
      id,
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getToolsList({ id, params, signal }),
  })
}

const useGetDetailTools = ({ id, tool_actual_id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => getDetailTools({ id, tool_actual_id, params, mutationProps }),
    ...config,
  })
}

export { getTools, useGetTools_, useGetTools, getDetailTools, useGetDetailTools }
