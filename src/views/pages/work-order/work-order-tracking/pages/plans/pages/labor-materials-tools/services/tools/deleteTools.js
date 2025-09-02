import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteTools = async ({ parent_id, id, signal }) => {
  return await axios.delete(`/work-orders/tasks/${parent_id}/tools/${id}`, { signal })
}

const useDeleteTools = ({ parent_id, id, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => deleteTools({ parent_id, id, ...mutationProps }),
    ...config,
  })
}

export { deleteTools, useDeleteTools }
