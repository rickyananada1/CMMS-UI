import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadTasks = async ({ id, data, signal }) => {
  return await axios.post(`/work-orders/${id}/task-actuals/download`, data, { signal })
}

const useDownloadTasks = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadTasks({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadTasks, useDownloadTasks }
