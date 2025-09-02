import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createQRTask = async ({ data, id, signal }) => {
  return await axios.post(`/work-orders/${id}/tasks`, data, { signal })
}

const useCreateQRTask = (props) => {
  return useMutation({
    mutationFn: createQRTask,
    ...props?.config,
  })
}

export { createQRTask, useCreateQRTask }
