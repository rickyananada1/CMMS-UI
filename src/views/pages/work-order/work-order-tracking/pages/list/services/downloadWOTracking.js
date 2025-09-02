import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadWOTracking = async ({ data, signal }) => {
  return await axios.post(`/work-orders/download`, data, { signal })
}

const useDownloadWOTracking = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadWOTracking({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadWOTracking, useDownloadWOTracking }
