import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getWorkTypes = async ({ params, signal }) => {
  return await axios.get('/work-orders/work-type', { params, signal })
}

const useGetWorkTypes = (props) => {
  return useMutation({
    mutationFn: getWorkTypes,
    ...props?.config,
  })
}

const getWorkClassifications = async ({ params, signal }) => {
  return await axios.get('/work-orders/work-classification', { params, signal })
}

const useGetWorkClassifications = (props) => {
  return useMutation({
    mutationFn: getWorkClassifications,
    ...props?.config,
  })
}

const getWorkPriorities = async ({ params, signal }) => {
  return await axios.get('/work-orders/work-priority', { params, signal })
}

const useGetWorkPriorities = (props) => {
  return useMutation({
    mutationFn: getWorkPriorities,
    ...props?.config,
  })
}

const getFailureCodes = async ({ params, signal }) => {
  return await axios.get('/failure_code', { params, signal })
}

const useGetFailureCodes = (props) => {
  return useMutation({
    mutationFn: getFailureCodes,
    ...props?.config,
  })
}

const getHazardGroup = async ({ params, signal }) => {
  return await axios.get('/safety/hazard-precautions?site=0', { params, signal })
}

const useGetHazardGroup = (props) => {
  return useMutation({
    mutationFn: getHazardGroup,
    ...props?.config,
  })
}

const getSites = async ({ org_id, params, signal }) => {
  return await axios.get('/administration/organizations/' + org_id + '/sites', { params, signal })
}

const useGetSites = ({ org_id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => getSites({ org_id, params, ...mutationProps }),
    ...config,
  })
}

const getAssets = async ({ params, signal }) => {
  return await axios.get('/assets', { params, signal })
}

const useGetAssets = (props) => {
  return useMutation({
    mutationFn: getAssets,
    ...props?.config,
  })
}

const getWorkOrders = async ({ params, signal }) => {
  return await axios.get('/work-orders', { params, signal })
}

const useGetWorkOrders = (props) => {
  return useMutation({
    mutationFn: getWorkOrders,
    ...props?.config,
  })
}

const getUserSites = async ({ site, params, signal }) => {
  return axios.get('/work-orders/servicerequestbysite/' + site, { params, signal })
}

const useGetUserSites = ({ site, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => getUserSites({ site, params, ...mutationProps }),
    ...config,
  })
}

export {
  useGetWorkTypes,
  useGetWorkClassifications,
  useGetWorkPriorities,
  useGetFailureCodes,
  useGetHazardGroup,
  useGetSites,
  useGetAssets,
  useGetWorkOrders,
  useGetUserSites,
}
