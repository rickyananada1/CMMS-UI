import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateTools = async ({ data, id, material_id, signal }) => {
  return await axios.put(`/work-orders/tasks/${id}/tools/${material_id}`, data, { signal })
}

const useUpdateTools = (props) => {
  return useMutation({
    mutationFn: updateTools,
    ...props?.config,
  })
}

export { updateTools, useUpdateTools }
