import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createAssetsSafetyHazardousMaterials = async ({ id, data, signal }) => {
  return await axios.post(`/assets/${id}/hazard-material`, data, { signal })
}

const useCreateAssetsSafetyHazardousMaterials = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      createAssetsSafetyHazardousMaterials({ id, data, ...mutationProps }),
    ...config,
  })
}

export { createAssetsSafetyHazardousMaterials, useCreateAssetsSafetyHazardousMaterials }
