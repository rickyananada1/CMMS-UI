import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteAssetsSafetyRelatedAssets = async ({ id, data, params, signal }) => {
  return await axios.delete(`/assets/${id}/safety-related-asset`, { data, params, signal })
}

const useDeleteAssetsSafetyRelatedAssets = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => deleteAssetsSafetyRelatedAssets({ id, data, ...mutationProps }),
    ...config,
  })
}

export { deleteAssetsSafetyRelatedAssets, useDeleteAssetsSafetyRelatedAssets }
