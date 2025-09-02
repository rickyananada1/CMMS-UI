import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'
import { getAssets } from '../../list/services'

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

const getConditionCodeDropdown = async ({ params, signal }) => {
  return await axios.get(`/assets/condition-codes`, { params, signal })
}

const useGetConditionCodeDropdown = (props) => {
  return useMutation({
    mutationFn: getConditionCodeDropdown,
    ...props?.config,
  })
}

const getFailureCodeDropdown = async ({ params, signal }) => {
  return await axios.get(`/failure_code`, { params, signal })
}

const useGetFailureCodeDropdown = (props) => {
  return useMutation({
    mutationFn: getFailureCodeDropdown,
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

const getMeterGroupDropdown = async ({ params, signal }) => {
  return await axios.get(`/meter-groups`, { params, signal })
}

const useGetMeterGroupDropdown = (props) => {
  return useMutation({
    mutationFn: getMeterGroupDropdown,
    ...props?.config,
  })
}

const getAllSiteOrganizations = async ({ id, params, signal }) => {
  return await axios.get(`/administration/organizations/${id}/sites`, {
    params,
    signal,
  })
}

const useSiteDropdown = (props) => {
  return useMutation({
    mutationFn: getAllSiteOrganizations,
    ...props?.config,
  })
}

export {
  getLocationDropdown,
  useGetLocationDropdown,
  useGetAssetDropdown,
  useGetConditionCodeDropdown,
  useGetFailureCodeDropdown,
  useGetCompeniesDropdown,
  useGetMeterGroupDropdown,
  useSiteDropdown,
}
