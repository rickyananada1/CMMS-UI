import { useMutation } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const serviceOrganizationList = async ({ params, signal }) => {
  return await axios.get('/administration/organizations', { params, signal })
}

const useServiceOrganizationList = ({ config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['organizations', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => serviceOrganizationList({ params, signal }),
  })
}

const useGetOrganizationDropdown = (props) => {
  return useMutation({
    mutationFn: serviceOrganizationList,
    ...props?.config,
  })
}

const serviceOrganizationDetail = async ({ id, params, signal }) => {
  return await axios.get(`/administration/organizations/${id}`, { params, signal })
}

const useServiceOrganizationDetail = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['detail-organization', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => serviceOrganizationDetail({ id, params, signal }),
  })
}

const serviceOrganizationCreate = async ({ data, signal }) => {
  return await axios.post(`/administration/organizations/create`, data, { signal })
}

const useServiceOrganizationCreate = (props) => {
  return useMutation({
    mutationFn: serviceOrganizationCreate,
    ...props?.config,
  })
}

const serviceOrganizationUpdate = async ({ id, data, signal }) => {
  return await axios.put(`/administration/organizations/${id}`, data, { signal })
}

const useServiceOrganizationUpdate = (props) => {
  return useMutation({
    mutationFn: serviceOrganizationUpdate,
    ...props?.config,
  })
}

const serviceOrganizationDelete = async ({ params, signal }) => {
  return await axios.delete(`/administration/organizations/${params?.id}`, { signal })
}

const useServiceOrganizationDelete = (props) => {
  return useMutation({
    mutationFn: serviceOrganizationDelete,
    ...props?.config,
  })
}

const download = async ({ data, signal }) => {
  return await axios.post(`/administration/organizations/download`, data, { signal })
}

const useDownload = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => download({ data, ...mutationProps }),
    ...config,
  })
}

export {
  serviceOrganizationList,
  useServiceOrganizationList,
  serviceOrganizationDetail,
  useServiceOrganizationDetail,
  serviceOrganizationCreate,
  useServiceOrganizationCreate,
  serviceOrganizationUpdate,
  useServiceOrganizationUpdate,
  serviceOrganizationDelete,
  useServiceOrganizationDelete,
  download,
  useDownload,
  useGetOrganizationDropdown,
}
