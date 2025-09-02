import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadJobPlanTask = async ({ id, data, params, signal }) => {
  return await axios.post(`/planning/job-planning/${id}/work-order-task/download`, data, {
    signal,
    params,
  })
}

const downloadJobPlanLabor = async ({ id, data, params, signal }) => {
  return await axios.post(`/planning/job-planning/${id}/work-order-labor/download`, data, {
    signal,
    params,
  })
}

const downloadJobPlanMaterial = async ({ id, data, params, signal }) => {
  return await axios.post(`/planning/job-planning/${id}/work-order-materials/download`, data, {
    signal,
    params,
  })
}

const downloadJobPlanTool = async ({ id, data, params, signal }) => {
  return await axios.post(`/planning/job-planning/${id}/work-order-tools/download`, data, {
    signal,
    params,
  })
}

const useDownloadJobPlanTask = (props) => {
  return useMutation({
    mutationFn: downloadJobPlanTask,
    ...props?.config,
  })
}

const useDownloadJobPlanLabor = (props) => {
  return useMutation({
    mutationFn: downloadJobPlanLabor,
    ...props?.config,
  })
}

const useDownloadJobPlanMaterial = (props) => {
  return useMutation({
    mutationFn: downloadJobPlanMaterial,
    ...props?.config,
  })
}

const useDownloadJobPlanTool = (props) => {
  return useMutation({
    mutationFn: downloadJobPlanTool,
    ...props?.config,
  })
}

export {
  downloadJobPlanTask,
  downloadJobPlanLabor,
  downloadJobPlanMaterial,
  downloadJobPlanTool,
  useDownloadJobPlanTask,
  useDownloadJobPlanLabor,
  useDownloadJobPlanMaterial,
  useDownloadJobPlanTool,
}
