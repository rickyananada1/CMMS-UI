import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteMaterials = async ({ id, parent_id, signal }) => {
  return await axios.delete(`/work-orders/tasks/${parent_id}/materials/${id}`, { signal })
}

const useDeleteMaterials = ({ id, parent_id, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => deleteMaterials({ id, parent_id, ...mutationProps }),
    ...config,
  })
}

export { deleteMaterials, useDeleteMaterials }
