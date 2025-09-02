import { useMutation } from '@tanstack/react-query'
import { siteOrgList } from 'src/views/pages/security/security-groups/pages/sites/services/orgSites'
import { getConditionMonitoring } from '../../list/services'
import { getJobPlanList } from 'src/views/pages/job-plan/page/list/services'
import { getPreventiveMaintenances } from 'src/views/pages/work-order/preventive-maintenance/pages/list/services'
import axios from 'src/libs/axios'

const getListMeters = async ({ params, signal }) => {
  return await axios.get(`/asset/meters`, { params, signal })
}

const getListAssets = async ({ params, signal }) => {
  return await axios.get(`/asset/asset-meter`, { params, signal })
}

const getListLocations = async ({ params, signal }) => {
  return await axios.get(`/asset/location-meter`, { params, signal })
}

const useGetLocationDropdown = (props) => {
  return useMutation({
    mutationFn: getListLocations,
    ...props?.config,
  })
}

const useGetAssetDropdown = (props) => {
  return useMutation({
    mutationFn: getListAssets,
    ...props?.config,
  })
}

const useGetMeterDropdown = (props) => {
  return useMutation({
    mutationFn: getListMeters,
    ...props?.config,
  })
}

const useSiteDropdown = ({ id, config, params } = {}) => {
  return useMutation({
    mutationFn: (mutationProps) => siteOrgList({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetCMDropdown = (props) => {
  return useMutation({
    mutationFn: getConditionMonitoring,
    ...props?.config,
  })
}

const useGetJobPlanDropdown = (props) => {
  return useMutation({
    mutationFn: getJobPlanList,
    ...props?.config,
  })
}

const useGetPMDropdown = (props) => {
  return useMutation({
    mutationFn: getPreventiveMaintenances,
    ...props?.config,
  })
}

export {
  useGetLocationDropdown,
  useGetAssetDropdown,
  useGetMeterDropdown,
  useSiteDropdown,
  useGetCMDropdown,
  useGetJobPlanDropdown,
  useGetPMDropdown,
  getListMeters,
}
