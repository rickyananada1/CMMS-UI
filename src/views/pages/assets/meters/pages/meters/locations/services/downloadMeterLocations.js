import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadMeterLocations = async ({ id, data, signal }) => {
  return await axios.post(`/meters/${id}/locations/download`, data, { signal })
}

const useDownloadMeterLocations = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadMeterLocations({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadMeterLocations, useDownloadMeterLocations }
