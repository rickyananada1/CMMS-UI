import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteTools = async ({ id, parent_id, signal }) => {
  return await axios.delete(`/work-orders/tasks/${parent_id}/tools/${id}`, { signal })
}

const useDeleteTools = ({ id, parent_id, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => deleteTools({ id, parent_id, ...mutationProps }),
    ...config,
  })
}

export { deleteTools, useDeleteTools }
