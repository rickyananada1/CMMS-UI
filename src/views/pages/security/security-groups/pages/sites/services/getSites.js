import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const siteList = async ({ id, params, signal }) => {
  return await axios.get(`/security-groups/${id}/sites`, {
    params,
    signal,
  })
}

const useSiteList = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'security-group-sites',
      id,
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => siteList({ id, params, signal }),
  })
}

const useSiteListOptions = ({ id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => siteList({ id, params, ...mutationProps }),
    ...config,
  })
}

export { siteList, useSiteList, useSiteListOptions }
