import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteLocationSafetyRelatedAssets = async ({ id, data, params, signal }) => {
  return await axios.delete(`/locations/${id}/safety-related-asset`, { data, params, signal })
}

const useDeleteLocationSafetyRelatedAssets = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      deleteLocationSafetyRelatedAssets({ id, data, ...mutationProps }),
    ...config,
  })
}

export { deleteLocationSafetyRelatedAssets, useDeleteLocationSafetyRelatedAssets }
