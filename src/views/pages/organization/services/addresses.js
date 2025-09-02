import { useMutation } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const organizationAddressesDetail = async ({ params, signal }) => {
  return await axios.get(`/administration/organizations/${params?.organization_id}/addresses`, {
    params,
    signal,
  })
}

const useOrganizationAddressesDetail = (props) => {
  return useMutation({
    mutationFn: organizationAddressesDetail,
    ...props?.config,
  })
}

const organizationAddressesDetailByAddressId = async ({ params, signal }) => {
  return await axios.get(
    `/administration/organizations/${params?.organization_id}/addresses/${params?.address_id}`,
    {
      params,
      signal,
    },
  )
}

const useOrganizationAddressesDetailByAddressId = (props) => {
  return useMutation({
    mutationFn: organizationAddressesDetailByAddressId,
    ...props?.config,
  })
}

const serviceAddressList = async ({ params, signal }) => {
  return await axios.get(`/administration/organizations/${params.organization_id}/addresses`, {
    params,
    signal,
  })
}

const useServiceAddressList = ({ config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'organization_addresses_list',
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => serviceAddressList({ params, signal }),
  })
}

const serviceListAvailableSiteAddress = async ({ params, signal }) => {
  return await axios.get(
    `/administration/organizations/${params.organization_id}/sites/available`,
    {
      params,
      signal,
    },
  )
}

const serviceListAddress = async ({ params, signal }) => {
  return await axios.get(`/administration/organizations/${params.organization_id}/addresses`, {
    params,
    signal,
  })
}

const useServiceListAvailableSiteAddress = (props) => {
  return useMutation({
    mutationFn: serviceListAvailableSiteAddress,
    ...props?.config,
  })
}

const useServiceListAddress = (props) => {
  return useMutation({
    mutationFn: serviceListAddress,
    ...props?.config,
  })
}

const organizationAddressesCreate = async ({ id, body, signal }) => {
  return await axios.post(`/administration/organizations/${id}/addresses/create-multiple`, body, {
    signal,
  })
}

const useOrganizationAddressesCreate = (props) => {
  return useMutation({
    mutationFn: organizationAddressesCreate,
    ...props?.config,
  })
}

const organizationAddressesUpdate = async ({ body, signal }) => {
  return await axios.put(`/administration/organizations/${body?.organization_id}/addresses`, body, {
    signal,
  })
}

const useOrganizationAddressesUpdate = (props) => {
  return useMutation({
    mutationFn: organizationAddressesUpdate,
    ...props?.config,
  })
}

const organizationAddressesUpdateByAddressId = async ({ body, signal }) => {
  return await axios.put(
    `/administration/organizations/${body?.organization_id}/addresses/${body?.address_id}`,
    body,
    {
      signal,
    },
  )
}

const useOrganizationAddressesUpdateByAddressId = (props) => {
  return useMutation({
    mutationFn: organizationAddressesUpdateByAddressId,
    ...props?.config,
  })
}

const deleteOrganizationAddresses = async ({ params, signal }) => {
  return await axios.delete(
    `/administration/organizations/${params.org_id}/addresses/${params.id}`,
    {
      signal,
    },
  )
}

const useDeleteOrganizationAddresses = (props) => {
  return useMutation({
    mutationFn: deleteOrganizationAddresses,
    ...props?.config,
  })
}

const provinceList = async ({ params, signal }) => {
  return await axios.get('/region/provinces', { params, signal })
}

const useProvinceList = (props) => {
  return useMutation({
    mutationFn: provinceList,
    ...props?.config,
  })
}

const cityList = async ({ params, signal }) => {
  return await axios.get(`/region/provinces/${params.province_id}/cities`, { params, signal })
}

const useCityist = (props) => {
  return useMutation({
    mutationFn: cityList,
    ...props?.config,
  })
}

const downloadAddressesList = async ({ id, data, signal }) => {
  return await axios.post(`/administration/organizations/${id}/addresses/download`, data, {
    signal,
  })
}
const useDownloadAddressesList = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadAddressesList({ id, data, ...mutationProps }),
    ...config,
  })
}

export {
  organizationAddressesCreate,
  useOrganizationAddressesCreate,
  organizationAddressesDetail,
  useOrganizationAddressesDetail,
  organizationAddressesUpdate,
  useOrganizationAddressesUpdate,
  deleteOrganizationAddresses,
  useDeleteOrganizationAddresses,
  provinceList,
  useProvinceList,
  cityList,
  useCityist,
  serviceAddressList,
  useServiceAddressList,
  organizationAddressesDetailByAddressId,
  useOrganizationAddressesDetailByAddressId,
  organizationAddressesUpdateByAddressId,
  useOrganizationAddressesUpdateByAddressId,
  serviceListAvailableSiteAddress,
  useServiceListAvailableSiteAddress,
  useDownloadAddressesList,
  useServiceListAddress,
}
