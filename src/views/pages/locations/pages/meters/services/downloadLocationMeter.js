import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadLocationMeter = async ({ id, data, signal }) => {
  return await axios.post(`/location/${id}/meters/download`, data, { signal })
}

const useDownloadLocationMeter = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadLocationMeter({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadLocationMeter, useDownloadLocationMeter }
