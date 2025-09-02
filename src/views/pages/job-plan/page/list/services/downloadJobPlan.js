import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadJobPlan = async ({ data, params, signal }) => {
  return await axios.post(`/planning/job-planning/download`, data, { signal, params })
}

const useDownloadJobPlan = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadJobPlan({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadJobPlan, useDownloadJobPlan }
