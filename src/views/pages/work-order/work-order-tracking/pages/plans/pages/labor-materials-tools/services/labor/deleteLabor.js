import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteLabor = async ({ parent_id, id, signal }) => {
  return await axios.delete(`/work-orders/tasks/${parent_id}/labors/${id}`, { signal })
}

const useDeleteLabor = ({ parent_id, id, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => deleteLabor({ parent_id, id, ...mutationProps }),
    ...config,
  })
}

export { deleteLabor, useDeleteLabor }
