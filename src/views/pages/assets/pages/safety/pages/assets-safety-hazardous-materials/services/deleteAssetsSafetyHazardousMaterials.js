import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteAssetsSafetyHazardousMaterials = async ({ id, data, params, signal }) => {
  return await axios.delete(`/assets/${id}/hazard-material`, { data, params, signal })
}

const useDeleteAssetsSafetyHazardousMaterials = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      deleteAssetsSafetyHazardousMaterials({ id, data, ...mutationProps }),
    ...config,
  })
}

export { deleteAssetsSafetyHazardousMaterials, useDeleteAssetsSafetyHazardousMaterials }
