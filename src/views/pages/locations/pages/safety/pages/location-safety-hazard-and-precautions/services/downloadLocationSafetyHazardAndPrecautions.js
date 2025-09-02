import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadLocationSafetyHazardAndPrecautions = async ({ id, data, signal }) => {
  return await axios.post(`/locations/${id}/hazard-precaution/download`, data, { signal })
}

const useDownloadLocationSafetyHazardAndPrecautions = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      downloadLocationSafetyHazardAndPrecautions({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadLocationSafetyHazardAndPrecautions, useDownloadLocationSafetyHazardAndPrecautions }
