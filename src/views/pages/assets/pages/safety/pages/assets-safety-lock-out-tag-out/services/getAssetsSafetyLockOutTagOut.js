import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getAssetsSafetyHazardsTagOut = async ({ id, params, signal }) => {
  return await axios.get(`/assets/${id}/hazard-precaution`, { params, signal })
}

const useGetAssetsSafetyHazardsTagOut = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => getAssetsSafetyHazardsTagOut({ id, params, ...mutationProps }),
    ...config,
  })
}

const getAssetsSafetyTagOut = async ({ params, signal }) => {
  return await axios.get(`/safety/tag-outs`, { params, signal })
}

const useGetAssetsSafetyTagOut = (props) => {
  return useMutation({
    mutationFn: getAssetsSafetyTagOut,
    ...props?.config,
  })
}

const getAssetsSafetyLockOutTagOut = async ({ id, params, signal }) => {
  return await axios.get(`/assets/${id}/tag-lock`, { params, signal })
}

const useGetAssetsSafetyLockOutTagOutList = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => getAssetsSafetyLockOutTagOut({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetAssetsSafetyLockOutTagOutTableList = ({ id, config, params }) => {
  return useQuery({
    ...config,
    queryKey: [
      'assets-safety-lock-out-tag-out',
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getAssetsSafetyLockOutTagOut({ id, params, signal }),
  })
}

const getDetailAssetsSafetyLockOutTagOut = async ({ id, params, signal }) => {
  return await axios.get(`/safety/${id}/tag-outs`, { params, signal })
}

const useGetDetailAssetsSafetyLockOutTagOut = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      getDetailAssetsSafetyLockOutTagOut({ id, params, ...mutationProps }),
    ...config,
  })
}

export {
  getAssetsSafetyHazardsTagOut,
  useGetAssetsSafetyHazardsTagOut,
  getAssetsSafetyTagOut,
  useGetAssetsSafetyTagOut,
  getAssetsSafetyLockOutTagOut,
  getDetailAssetsSafetyLockOutTagOut,
  useGetDetailAssetsSafetyLockOutTagOut,
  useGetAssetsSafetyLockOutTagOutList,
  useGetAssetsSafetyLockOutTagOutTableList,
}
