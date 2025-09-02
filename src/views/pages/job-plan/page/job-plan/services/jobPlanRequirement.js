import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'
import { getAssets } from 'src/views/pages/assets/pages/list/services'

const getAllOrganizations = async ({ params, signal }) => {
  return await axios.get(`/administration/organizations`, { params, signal })
}

const useGetAllOrganizations = (props) => {
  return useMutation({
    mutationFn: getAllOrganizations,
    ...props?.config,
  })
}

const getAllSiteOrganizations = async ({ id, params, signal }) => {
  return await axios.get(`/administration/organizations/${id}/sites`, { params, signal })
}
const useSiteOrganizationDropdown = (props) => {
  return useMutation({
    mutationFn: getAllSiteOrganizations,
    ...props?.config,
  })
}

const getLocationDropdown = async ({ params, signal }) => {
  return await axios.get(`/location`, { params, signal })
}

const useGetLocationDropdown = (props) => {
  return useMutation({
    mutationFn: getLocationDropdown,
    ...props?.config,
  })
}

const useGetAssetDropdown = (props) => {
  return useMutation({
    mutationFn: getAssets,
    ...props?.config,
  })
}

const getCompeniesDropdown = async ({ params, signal }) => {
  return await axios.get(`/assets/companies`, { params, signal })
}

const useGetCompeniesDropdown = (props) => {
  return useMutation({
    mutationFn: getCompeniesDropdown,
    ...props?.config,
  })
}

const getSpareparts = async ({ params, signal }) => {
  return await axios.get(`/sparepart`, { params, signal })
}

const useGetSpareparts = (props) => {
  return useMutation({
    mutationFn: getSpareparts,
    ...props?.config,
  })
}

export {
  useGetAllOrganizations,
  useSiteOrganizationDropdown,
  useGetLocationDropdown,
  useGetAssetDropdown,
  useGetCompeniesDropdown,
  useGetSpareparts,
}
