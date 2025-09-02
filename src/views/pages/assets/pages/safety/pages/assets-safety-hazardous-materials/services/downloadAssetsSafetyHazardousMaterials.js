import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadAssetsSafetyHazardousMaterials = async ({ id, data, signal }) => {
  return await axios.post(`/assets/${id}/hazard-material/download`, data, { signal })
}

const useDownloadAssetsSafetyHazardousMaterials = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      downloadAssetsSafetyHazardousMaterials({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadAssetsSafetyHazardousMaterials, useDownloadAssetsSafetyHazardousMaterials }
