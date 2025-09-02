import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateTaskForWorkOrder = async ({ data, id, task_id, signal }) => {
  return await axios.put(`/work-orders/${id}/tasks/${task_id}`, data, { signal })
}

const useUpdateTaskForWorkOrder = (props) => {
  return useMutation({
    mutationFn: updateTaskForWorkOrder,
    ...props?.config,
  })
}

export { updateTaskForWorkOrder, useUpdateTaskForWorkOrder }
