import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getAssets = async ({ params, signal }) => {
  return await axios.get(`/assets`, { params, signal })
}

const useGetAssets = (props) => {
  return useMutation({
    mutationFn: getAssets,
    ...props?.config,
  })
}

const getAssetsSafetyRelatedAssets = async ({ id, params, signal }) => {
  return await axios.get(`/assets/${id}/safety-related-asset`, { params, signal })
}

const useGetAssetsSafetyRelatedAssetsList = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => getAssetsSafetyRelatedAssets({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetAssetsSafetyRelatedAssetsTableList = ({ id, config, params }) => {
  return useQuery({
    ...config,
    queryKey: [
      'assets-safety-related-assets',
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getAssetsSafetyRelatedAssets({ id, params, signal }),
  })
}

const getDetailAssetsSafetyRelatedAssets = async ({ id, params, signal }) => {
  return await axios.get(`/assets/${id}/safety-related-asset`, { params, signal })
}

const useGetDetailAssetsSafetyRelatedAssets = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      getDetailAssetsSafetyRelatedAssets({ id, params, ...mutationProps }),
    ...config,
  })
}

export {
  getAssets,
  getAssetsSafetyRelatedAssets,
  getDetailAssetsSafetyRelatedAssets,
  useGetAssets,
  useGetDetailAssetsSafetyRelatedAssets,
  useGetAssetsSafetyRelatedAssetsList,
  useGetAssetsSafetyRelatedAssetsTableList,
}
