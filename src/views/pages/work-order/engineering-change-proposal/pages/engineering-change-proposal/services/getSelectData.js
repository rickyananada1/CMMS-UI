/* eslint-disable */
/* prettier-ignore-start */
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getAssets = async ({ params, signal }) => {
  return await axios.get('/assets', { params, signal })
}

const useGetAssets = (props) => {
  return useMutation({
    mutationFn: getAssets,
    ...props?.config,
  })
}

const getUserSites = async ({ siteid, params, signal }) => {
  return axios.get('/servicerequests/userbysite/' + siteid, { params, signal })
}

const useGetUserSites = ({ siteid, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => getUserSites({ siteid, params, ...mutationProps  }),
    ...config,
  })
}

const getReportBy = async ({ params, signal }) => {
  return axios.get('/me', { params, signal })
}

const useGetReportBy = (props) => {
  return useMutation({
    mutationFn: getReportBy,
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


export { useGetAssets, useGetUserSites, useGetSites, useGetReportBy }
