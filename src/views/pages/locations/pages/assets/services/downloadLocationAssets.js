import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadLocationAssets = async ({ id, data, signal }) => {
  return await axios.post(`/location/${id}/assets/download`, data, { signal })
}

const useDownloadLocationAssets = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadLocationAssets({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadLocationAssets, useDownloadLocationAssets }
