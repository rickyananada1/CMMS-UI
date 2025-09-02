import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadSecurityGroups = async ({ data, signal }) => {
  return await axios.post(`/security-groups/download`, data, { signal })
}

const useDownloadSecurityGroups = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadSecurityGroups({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadSecurityGroups, useDownloadSecurityGroups }
