import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteSecurityGroupsApplications = async ({ id, data, signal }) => {
  return await axios.delete(`/security-groups/${id}/applications`, { data, signal })
}

const useDeleteSecurityGroupsApplications = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => deleteSecurityGroupsApplications({ id, data, ...mutationProps }),
    ...config,
  })
}

export { deleteSecurityGroupsApplications, useDeleteSecurityGroupsApplications }
