import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteMaterials = async ({ parent_id, id, signal }) => {
  return await axios.delete(`/work-orders/tasks/${parent_id}/materials/${id}`, { signal })
}

const useDeleteMaterials = ({ parent_id, id, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => deleteMaterials({ parent_id, id, ...mutationProps }),
    ...config,
  })
}

export { deleteMaterials, useDeleteMaterials }
