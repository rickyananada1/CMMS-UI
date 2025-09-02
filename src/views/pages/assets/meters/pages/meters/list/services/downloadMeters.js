import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadMeters = async ({ data, signal }) => {
  return await axios.post(`/meters/download`, data, { signal })
}

const useDownloadMeters = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadMeters({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadMeters, useDownloadMeters }
