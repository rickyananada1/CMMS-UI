import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createTaskForWorkOrder = async ({ data, id, signal }) => {
  return await axios.post(`/work-orders/${id}/tasks`, data, { signal })
}

const useCreateTaskForWorkOrder = (props) => {
  return useMutation({
    mutationFn: createTaskForWorkOrder,
    ...props?.config,
  })
}

export { createTaskForWorkOrder, useCreateTaskForWorkOrder }
