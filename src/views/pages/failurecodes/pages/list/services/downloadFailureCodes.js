import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadFailureCodes = async ({ data, signal }) => {
  return await axios.post(`/failure_code/download`, data, { signal })
}

const useDownloadFailureCodes = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadFailureCodes({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadFailureCodes, useDownloadFailureCodes }
