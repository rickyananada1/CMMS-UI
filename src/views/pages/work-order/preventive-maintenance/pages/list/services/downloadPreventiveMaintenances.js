import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadPreventiveMaintenances = async ({ data, signal }) => {
  return await axios.post(`/preventive-maintenance/download`, data, { signal })
}

const useDownloadPreventiveMaintenances = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadPreventiveMaintenances({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadPreventiveMaintenances, useDownloadPreventiveMaintenances }
