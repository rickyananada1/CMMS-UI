import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateSecurityGroupsApplications = async ({ id, data, signal }) => {
  return await axios.put(`/security-groups/${id}/permissions`, data, { signal })
}

const useUpdateSecurityGroupsApplications = (props) => {
  return useMutation({
    mutationFn: updateSecurityGroupsApplications,
    ...props?.config,
  })
}

export { updateSecurityGroupsApplications, useUpdateSecurityGroupsApplications }
