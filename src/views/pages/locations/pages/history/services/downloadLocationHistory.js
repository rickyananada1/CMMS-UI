import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadLocationHistory = async ({ id, data, signal }) => {
  return await axios.post(`/location/${id}/history/download`, data, { signal })
}

const useDownloadLocationHistory = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadLocationHistory({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadLocationHistory, useDownloadLocationHistory }
