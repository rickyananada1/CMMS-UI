import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadMeterAssets = async ({ id, data, signal }) => {
  return await axios.post(`/meters/${id}/assets/download`, data, { signal })
}

const useDownloadMeterAssets = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadMeterAssets({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadMeterAssets, useDownloadMeterAssets }
