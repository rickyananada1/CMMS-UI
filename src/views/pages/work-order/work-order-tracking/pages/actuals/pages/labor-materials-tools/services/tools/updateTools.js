import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateTools = async ({ data, id, tool_id, signal }) => {
  return await axios.put(`/work-orders/tasks/${id}/tool-actuals/${tool_id}`, data, { signal })
}

const useUpdateTools = (props) => {
  return useMutation({
    mutationFn: updateTools,
    ...props?.config,
  })
}

export { updateTools, useUpdateTools }
