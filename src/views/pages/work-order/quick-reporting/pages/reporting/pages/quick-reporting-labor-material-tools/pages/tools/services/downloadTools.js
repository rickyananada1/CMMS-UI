import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadTools = async ({ id, data, signal }) => {
  return await axios.post(`/work-orders/${id}/tools/download`, data, { signal })
}

const useDownloadTools = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadTools({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadTools, useDownloadTools }
