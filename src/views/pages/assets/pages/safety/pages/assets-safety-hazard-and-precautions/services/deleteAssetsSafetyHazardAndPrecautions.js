import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteAssetsSafetyHazardAndPrecautions = async ({ id, data, params, signal }) => {
  return await axios.delete(`/assets/${id}/hazard-precaution`, { data, params, signal })
}

const useDeleteAssetsSafetyHazardAndPrecautions = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      deleteAssetsSafetyHazardAndPrecautions({ id, data, ...mutationProps }),
    ...config,
  })
}

export { deleteAssetsSafetyHazardAndPrecautions, useDeleteAssetsSafetyHazardAndPrecautions }
