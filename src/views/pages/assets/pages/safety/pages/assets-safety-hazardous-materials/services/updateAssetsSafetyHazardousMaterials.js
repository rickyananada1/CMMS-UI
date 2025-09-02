import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateAssetsSafetyHazardousMaterials = async ({ id, data, signal }) => {
  return await axios.put(`/assets/${id}/hazard-material`, data, { signal })
}

const useUpdateAssetsSafetyHazardousMaterials = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      updateAssetsSafetyHazardousMaterials({ id, data, ...mutationProps }),
    ...config,
  })
}

export { updateAssetsSafetyHazardousMaterials, useUpdateAssetsSafetyHazardousMaterials }
