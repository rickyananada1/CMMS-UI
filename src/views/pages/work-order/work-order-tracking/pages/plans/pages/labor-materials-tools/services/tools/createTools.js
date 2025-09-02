import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createTools = async ({ data, id, signal }) => {
  return await axios.post(`/work-orders/tasks/${id}/tools`, data, { signal })
}

const useCreateTools = (props) => {
  return useMutation({
    mutationFn: createTools,
    ...props?.config,
  })
}

export { createTools, useCreateTools }
