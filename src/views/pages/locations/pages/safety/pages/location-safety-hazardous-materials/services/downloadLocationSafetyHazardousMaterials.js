import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadLocationSafetyHazardousMaterials = async ({ id, data, signal }) => {
  return await axios.post(`/locations/${id}/hazard-material/download`, data, { signal })
}

const useDownloadLocationSafetyHazardousMaterials = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      downloadLocationSafetyHazardousMaterials({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadLocationSafetyHazardousMaterials, useDownloadLocationSafetyHazardousMaterials }
