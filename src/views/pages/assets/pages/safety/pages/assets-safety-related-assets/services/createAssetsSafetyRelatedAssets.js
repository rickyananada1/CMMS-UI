import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createAssetsSafetyRelatedAssets = async ({ id, data, signal }) => {
  return await axios.post(`/assets/${id}/safety-related-asset`, data, { signal })
}

const useCreateAssetsSafetyRelatedAssets = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => createAssetsSafetyRelatedAssets({ id, data, ...mutationProps }),
    ...config,
  })
}

export { createAssetsSafetyRelatedAssets, useCreateAssetsSafetyRelatedAssets }
