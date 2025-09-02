import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createLocationSafetyRelatedAssets = async ({ id, data, signal }) => {
  return await axios.post(`/locations/${id}/safety-related-asset`, data, { signal })
}

const useCreateLocationSafetyRelatedAssets = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      createLocationSafetyRelatedAssets({ id, data, ...mutationProps }),
    ...config,
  })
}

export { createLocationSafetyRelatedAssets, useCreateLocationSafetyRelatedAssets }
