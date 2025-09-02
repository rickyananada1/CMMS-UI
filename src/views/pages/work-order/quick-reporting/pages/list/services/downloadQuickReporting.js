import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadQuickReporting = async ({ data, signal }) => {
  return await axios.post(`/quick-reporting/download`, data, { signal })
}

const useDownloadQuickReporting = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadQuickReporting({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadQuickReporting, useDownloadQuickReporting }
