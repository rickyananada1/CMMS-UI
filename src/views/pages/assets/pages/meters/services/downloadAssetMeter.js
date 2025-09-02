import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadAssetMeter = async ({ id, data, signal }) => {
  return await axios.post(`/asset/${id}/meters/download`, data, { signal })
}

const useDownloadAssetMeter = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadAssetMeter({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadAssetMeter, useDownloadAssetMeter }
