import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadSecurityGroupsApplications = async ({ id, data, signal }) => {
  return await axios.post(`/security-groups/${id}/applications/download`, data, { signal })
}

const useDownloadSecurityGroupsApplications = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      downloadSecurityGroupsApplications({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadSecurityGroupsApplications, useDownloadSecurityGroupsApplications }
