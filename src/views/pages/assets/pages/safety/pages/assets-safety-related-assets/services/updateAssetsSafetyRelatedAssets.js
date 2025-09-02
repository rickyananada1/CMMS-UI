import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateAssetsSafetyRelatedAssets = async ({ id, data, signal }) => {
  return await axios.put(`/assets/${id}/safety-related-asset`, data, { signal })
}

const useUpdateAssetsSafetyRelatedAssets = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => updateAssetsSafetyRelatedAssets({ id, data, ...mutationProps }),
    ...config,
  })
}

export { updateAssetsSafetyRelatedAssets, useUpdateAssetsSafetyRelatedAssets }
