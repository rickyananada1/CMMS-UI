import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateQRTask = async ({ data, id, task_id, signal }) => {
  return await axios.put(`/work-orders/${id}/tasks/${task_id}`, data, { signal })
}

const useUpdateQRTask = (props) => {
  return useMutation({
    mutationFn: updateQRTask,
    ...props?.config,
  })
}

export { updateQRTask, useUpdateQRTask }
