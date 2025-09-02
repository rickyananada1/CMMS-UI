import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadSpareParts = async ({ id, data, signal }) => {
  return await axios.post(`/asset/sparepart/${id}/download`, data, { signal })
}

const useDownloadSpareParts = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadSpareParts({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadSpareParts, useDownloadSpareParts }
