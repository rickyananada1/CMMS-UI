import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadConditionMonitoring = async ({ data, signal }) => {
  return await axios.post(`/asset/condition-monitoring/download`, data, { signal })
}

const useDownloadConditionMonitoring = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadConditionMonitoring({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadConditionMonitoring, useDownloadConditionMonitoring }
