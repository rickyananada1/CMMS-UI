import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteTaskForWorkOder = async ({ data, signal }) => {
  return await axios.delete(`/work-orders/${data.work_order_id}/tasks/${data.work_order_task_id}`, {
    signal,
  })
}

const useDeleteTaskForWorkOrder = (props) => {
  return useMutation({
    mutationFn: deleteTaskForWorkOder,
    ...props?.config,
  })
}

export { deleteTaskForWorkOder, useDeleteTaskForWorkOrder }
