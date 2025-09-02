import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getSecurityGroupsApplicationsPermissions = async ({ id, params, signal }) => {
  return await axios.get(`/security-groups/${id}/permissions`, {
    params,
    signal,
  })
}

const useGetSecurityGroupsApplicationsPermissions = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      getSecurityGroupsApplicationsPermissions({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetGroupPerms = (props) => {
  return useMutation({
    mutationFn: getSecurityGroupsApplicationsPermissions,
    ...props?.config,
  })
}

const useGetListSecurityGroupsApplicationsPermissions = (props) => {
  return useMutation({
    mutationFn: getSecurityGroupsApplicationsPermissions,
    ...props?.config,
  })
}

const useGetSecurityGroupsApplicationsPermissionsTableList = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'security-groups-applications-permissions',
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getSecurityGroupsApplicationsPermissions({ id, params, signal }),
  })
}

export {
  getSecurityGroupsApplicationsPermissions,
  useGetSecurityGroupsApplicationsPermissions,
  useGetSecurityGroupsApplicationsPermissionsTableList,
  useGetListSecurityGroupsApplicationsPermissions,
  useGetGroupPerms,
}
