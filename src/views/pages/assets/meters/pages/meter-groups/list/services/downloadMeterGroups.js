import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadMeterGroups = async ({ data, signal }) => {
  return await axios.post(`/meter-groups/download`, data, { signal })
}

const useDownloadMeterGroups = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadMeterGroups({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadMeterGroups, useDownloadMeterGroups }
