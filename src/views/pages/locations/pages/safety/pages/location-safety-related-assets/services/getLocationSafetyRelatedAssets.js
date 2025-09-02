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

const getLocationSafetyRelatedAssets = async ({ id, params, signal }) => {
  return await axios.get(`/locations/${id}/safety-related-asset`, { params, signal })
}

const useGetLocationSafetyRelatedAssetsList = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => getLocationSafetyRelatedAssets({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetLocationSafetyRelatedAssetsTableList = ({ id, config, params }) => {
  return useQuery({
    ...config,
    queryKey: [
      'location-safety-related-assets',
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getLocationSafetyRelatedAssets({ id, params, signal }),
  })
}

const getDetailLocationSafetyRelatedAssets = async ({ id, params, signal }) => {
  return await axios.get(`/locations/${id}/safety-related-asset`, { params, signal })
}

const useGetDetailLocationSafetyRelatedAssets = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      getDetailLocationSafetyRelatedAssets({ id, params, ...mutationProps }),
    ...config,
  })
}

export {
  getAssets,
  getLocationSafetyRelatedAssets,
  getDetailLocationSafetyRelatedAssets,
  useGetAssets,
  useGetDetailLocationSafetyRelatedAssets,
  useGetLocationSafetyRelatedAssetsList,
  useGetLocationSafetyRelatedAssetsTableList,
}
