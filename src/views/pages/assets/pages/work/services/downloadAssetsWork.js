import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadAssetsWork = async ({ id, data, signal }) => {
  return await axios.post(`/work-orders/by-asset/${id}/download`, data, { signal })
}

const useDownloadAssetsWork = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadAssetsWork({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadAssetsWork, useDownloadAssetsWork }
