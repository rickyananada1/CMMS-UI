import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadLocations = async ({ data, signal }) => {
  return await axios.post(`/location/download`, data, { signal })
}

const useDownloadLocations = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadLocations({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadLocations, useDownloadLocations }
