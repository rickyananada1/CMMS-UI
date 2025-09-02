import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getQRTask = async ({ id, params, signal }) => {
  return await axios.get(`/work-orders/${id}/tasks`, { params, signal })
}

const useGetQRTask = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'quick-reporting-task',
      id,
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getQRTask({ id, params, signal }),
  })
}

const useGetQRTaskList = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => getQRTask({ id, params, ...mutationProps }),
    ...config,
  })
}

export { getQRTask, useGetQRTask, useGetQRTaskList }
