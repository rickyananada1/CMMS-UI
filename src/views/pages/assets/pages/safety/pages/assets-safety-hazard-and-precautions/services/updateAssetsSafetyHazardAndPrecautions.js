import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateAssetsSafetyHazardAndPrecautions = async ({ id, data, signal }) => {
  return await axios.put(`/assets/${id}/hazard-precaution`, data, { signal })
}

const useUpdateAssetsSafetyHazardAndPrecautions = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      updateAssetsSafetyHazardAndPrecautions({ id, data, ...mutationProps }),
    ...config,
  })
}

export { updateAssetsSafetyHazardAndPrecautions, useUpdateAssetsSafetyHazardAndPrecautions }
