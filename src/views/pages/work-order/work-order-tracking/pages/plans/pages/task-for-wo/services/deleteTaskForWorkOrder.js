import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteTaskForWorkOder = async ({ parent_id, id, signal }) => {
  return await axios.delete(`/work-orders/${parent_id}/tasks/${id}`, {
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
