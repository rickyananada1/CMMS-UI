import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadGroups = async ({ id, data, signal }) => {
  return await axios.post(`/users/${id}/security-group/download`, data, { signal })
}

const useDownloadGroups = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadGroups({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadGroups, useDownloadGroups }
