import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadFailureCodes = async ({ id, data, signal }) => {
  return await axios.post(`/work-orders/${id}/failure/download`, data, { signal })
}

const useDownloadFailureCodes = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadFailureCodes({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadFailureCodes, useDownloadFailureCodes }
