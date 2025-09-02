import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const siteOrgList = async ({ id, params, signal }) => {
  return await axios.get(`/administration/organizations/${id}/sites`, {
    params,
    signal,
  })
}

const useSiteOrgList = ({ id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => siteOrgList({ id, params, ...mutationProps }),
    ...config,
  })
}

const siteOrgDetail = async ({ id, secondId, params, signal }) => {
  return await axios.get(`/administration/organizations/${id}/sites/${secondId}`, {
    params,
    signal,
  })
}

const useSiteOrgDetail = ({ id, secondId, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => siteOrgDetail({ id, secondId, params, ...mutationProps }),
    ...config,
  })
}

export { siteOrgList, useSiteOrgList, siteOrgDetail, useSiteOrgDetail }
