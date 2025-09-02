import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadMeterCondition = async ({ id, data, signal }) => {
  return await axios.post(`/meters/${id}/condition-monitoring/download`, data, { signal })
}

const useDownloadMeterCondition = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadMeterCondition({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadMeterCondition, useDownloadMeterCondition }
