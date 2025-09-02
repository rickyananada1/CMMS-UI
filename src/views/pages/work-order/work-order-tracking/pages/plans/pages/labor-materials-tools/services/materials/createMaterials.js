import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createMaterials = async ({ data, id, signal }) => {
  return await axios.post(`/work-orders/tasks/${id}/materials`, data, { signal })
}

const useCreateMaterials = (props) => {
  return useMutation({
    mutationFn: createMaterials,
    ...props?.config,
  })
}

export { createMaterials, useCreateMaterials }
