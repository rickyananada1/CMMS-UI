import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateLocationSafetyRelatedAssets = async ({ id, data, signal }) => {
  return await axios.put(`/locations/${id}/safety-related-asset`, data, { signal })
}

const useUpdateLocationSafetyRelatedAssets = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      updateLocationSafetyRelatedAssets({ id, data, ...mutationProps }),
    ...config,
  })
}

export { updateLocationSafetyRelatedAssets, useUpdateLocationSafetyRelatedAssets }
