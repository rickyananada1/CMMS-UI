import { useMutation } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const serviceSiteList = async ({ params, signal }) => {
  return await axios.get(`/administration/organizations/${params?.organization_id}/sites`, {
    params,
    signal,
  })
}

const useServiceSiteList = ({ config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['organization_sites', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => serviceSiteList({ params, signal }),
  })
}

const serviceSiteDetail = async ({ orgId, params, signal }) => {
  return await axios.get(`/administration/organizations/${orgId}/sites/${params?.id}`, {
    signal,
  })
}

const useServiceSiteDetail = (props) => {
  return useMutation({
    mutationFn: serviceSiteDetail,
    ...props?.config,
  })
}

const serviceSiteAddressesDetail = async ({ orgId, params, signal }) => {
  return await axios.get(
    `/administration/organizations/${orgId}/sites/${params?.site_id}/addresses`,
    {
      signal,
    },
  )
}

const useServiceSiteAddressesDetail = (props) => {
  return useMutation({
    mutationFn: serviceSiteAddressesDetail,
    ...props?.config,
  })
}

const serviceSiteAddressList = async ({ params, signal }) => {
  return await axios.get(
    `/administration/organizations/${params.organization_id}/sites/${params?.site_id}/addresses`,
    {
      params,
      signal,
    },
  )
}

const useServiceSiteAddressList = ({ config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'organization_sites_addresses',
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => serviceSiteAddressList({ params, signal }),
  })
}

const serviceSiteCreate = async ({ orgId, body, signal }) => {
  return await axios.post(`/administration/organizations/${orgId}/sites/create`, body, {
    signal,
  })
}

const useServiceSiteCreate = (props) => {
  return useMutation({
    mutationFn: serviceSiteCreate,
    ...props?.config,
  })
}

const serviceSiteUpdate = async ({ orgId, body, signal }) => {
  return await axios.put(
    `/administration/organizations/${orgId}/sites/${body.site.site_id}`,
    body,
    {
      signal,
    },
  )
}

const useServiceSiteUpdate = (props) => {
  return useMutation({
    mutationFn: serviceSiteUpdate,
    ...props?.config,
  })
}

const serviceSiteDelete = async ({ orgId, params, signal }) => {
  return await axios.delete(`/administration/organizations/${orgId}/sites/${params?.id}`, {
    signal,
  })
}

const useServiceSiteDelete = (props) => {
  return useMutation({
    mutationFn: serviceSiteDelete,
    ...props?.config,
  })
}

const downloadSitesList = async ({ id, data, signal }) => {
  return await axios.post(`/administration/organizations/${id}/sites/download`, data, {
    signal,
  })
}
const useDownloadSitesList = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadSitesList({ id, data, ...mutationProps }),
    ...config,
  })
}

export {
  serviceSiteList,
  useServiceSiteList,
  serviceSiteDetail,
  useServiceSiteDetail,
  serviceSiteAddressList,
  useServiceSiteAddressList,
  serviceSiteCreate,
  useServiceSiteCreate,
  serviceSiteUpdate,
  useServiceSiteUpdate,
  serviceSiteDelete,
  useServiceSiteDelete,
  serviceSiteAddressesDetail,
  useServiceSiteAddressesDetail,
  useDownloadSitesList,
}
