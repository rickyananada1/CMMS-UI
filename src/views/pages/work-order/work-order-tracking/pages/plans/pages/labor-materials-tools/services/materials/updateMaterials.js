import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateMaterials = async ({ data, id, material_id, signal }) => {
  return await axios.put(`/work-orders/tasks/${id}/materials/${material_id}`, data, { signal })
}

const useUpdateMaterials = (props) => {
  return useMutation({
    mutationFn: updateMaterials,
    ...props?.config,
  })
}

export { updateMaterials, useUpdateMaterials }
