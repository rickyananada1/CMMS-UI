import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteQRTask = async ({ parent_id, id, signal }) => {
  return await axios.delete(`/work-orders/${parent_id}/tasks/${id}`, { signal })
}

const useDeleteQRTask = ({ parent_id, id, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => deleteQRTask({ parent_id, id, ...mutationProps }),
    ...config,
  })
}

export { deleteQRTask, useDeleteQRTask }
