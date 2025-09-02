import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadSites = async ({ id, data, signal }) => {
  return await axios.post(`/security-groups/${id}/sites/download`, data, { signal })
}

const useDownloadSites = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadSites({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadSites, useDownloadSites }
