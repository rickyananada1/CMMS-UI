import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getSecurityGroupsApplications = async ({ params, signal }) => {
  return await axios.get(`/applications`, {
    params,
    signal,
  })
}

const useGetSecurityGroupsApplications = ({ params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => getSecurityGroupsApplications({ params, ...mutationProps }),
    ...config,
  })
}

export { getSecurityGroupsApplications, useGetSecurityGroupsApplications }
