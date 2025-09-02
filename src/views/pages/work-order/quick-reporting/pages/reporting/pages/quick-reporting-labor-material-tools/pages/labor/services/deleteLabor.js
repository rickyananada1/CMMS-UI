import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteLabor = async ({ id, parent_id, signal }) => {
  return await axios.delete(`/work-orders/tasks/${parent_id}/labors/${id}`, { signal })
}

const useDeleteLabor = ({ id, parent_id, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => deleteLabor({ id, parent_id, ...mutationProps }),
    ...config,
  })
}

export { deleteLabor, useDeleteLabor }
