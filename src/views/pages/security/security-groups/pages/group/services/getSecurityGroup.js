import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getSecurityGroup = async ({ id, params, signal }) => {
  return await axios.get('/security-groups/' + id, { params, signal })
}

const useGetSecurityGroup = (props) => {
  return useMutation({
    mutationFn: getSecurityGroup,
    ...props?.config,
  })
}

const useGetSecurityGroupDetail = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'detail-security-group',
      id,
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getSecurityGroup({ id, params, signal }),
  })
}

export { getSecurityGroup, useGetSecurityGroup, useGetSecurityGroupDetail }
