import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createAssetsSafetyHazardAndPrecautions = async ({ id, data, signal }) => {
  return await axios.post(`/assets/${id}/hazard-precaution`, data, { signal })
}

const useCreateAssetsSafetyHazardAndPrecautions = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      createAssetsSafetyHazardAndPrecautions({ id, data, ...mutationProps }),
    ...config,
  })
}

export { createAssetsSafetyHazardAndPrecautions, useCreateAssetsSafetyHazardAndPrecautions }
