import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadAssets = async ({ data, signal }) => {
  return await axios.post(`/assets/download`, data, { signal })
}

const useDownloadAssets = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadAssets({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadAssets, useDownloadAssets }
