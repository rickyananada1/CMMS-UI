import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createSecurityGroupsApplications = async ({ id, data, signal }) => {
  return await axios.post(`/security-groups/${id}/applications`, data, { signal })
}

const useCreateSecurityGroupsApplications = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      createSecurityGroupsApplications({ id, params, ...mutationProps }),
    ...config,
  })
}

export { createSecurityGroupsApplications, useCreateSecurityGroupsApplications }
