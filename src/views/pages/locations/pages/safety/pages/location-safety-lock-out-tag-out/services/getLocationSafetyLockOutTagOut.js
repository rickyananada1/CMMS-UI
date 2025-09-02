import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getLocationSafetyHazardsTagOut = async ({ id, params, signal }) => {
  return await axios.get(`/locations/${id}/hazard-precaution`, { params, signal })
}

const useGetLocationSafetyHazardsTagOut = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => getLocationSafetyHazardsTagOut({ id, params, ...mutationProps }),
    ...config,
  })
}

const getLocationSafetyTagOut = async ({ params, signal }) => {
  return await axios.get(`/safety/tag-outs`, { params, signal })
}

const useGetLocationSafetyTagOut = (props) => {
  return useMutation({
    mutationFn: getLocationSafetyTagOut,
    ...props?.config,
  })
}

const getLocationSafetyLockOutTagOut = async ({ id, params, signal }) => {
  return await axios.get(`/locations/${id}/tag-lock`, { params, signal })
}

const useGetLocationSafetyLockOutTagOutList = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => getLocationSafetyLockOutTagOut({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetLocationSafetyLockOutTagOutTableList = ({ id, config, params }) => {
  return useQuery({
    ...config,
    queryKey: [
      'location-safety-lock-out-tag-out',
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getLocationSafetyLockOutTagOut({ id, params, signal }),
  })
}

const getDetailLocationSafetyLockOutTagOut = async ({ id, params, signal }) => {
  return await axios.get(`/safety/${id}/tag-outs`, { params, signal })
}

const useGetDetailLocationSafetyLockOutTagOut = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      getDetailLocationSafetyLockOutTagOut({ id, params, ...mutationProps }),
    ...config,
  })
}

export {
  getLocationSafetyHazardsTagOut,
  useGetLocationSafetyHazardsTagOut,
  getLocationSafetyTagOut,
  useGetLocationSafetyTagOut,
  getLocationSafetyLockOutTagOut,
  getDetailLocationSafetyLockOutTagOut,
  useGetDetailLocationSafetyLockOutTagOut,
  useGetLocationSafetyLockOutTagOutList,
  useGetLocationSafetyLockOutTagOutTableList,
}
