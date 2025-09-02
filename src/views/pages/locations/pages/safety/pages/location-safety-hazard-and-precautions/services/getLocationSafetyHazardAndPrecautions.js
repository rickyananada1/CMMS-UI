import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getLocationSafetyHazards = async ({ params, signal }) => {
  return await axios.get(`/safety/hazard-materials`, { params, signal })
}

const useGetLocationSafetyHazards = (props) => {
  return useMutation({
    mutationFn: getLocationSafetyHazards,
    ...props?.config,
  })
}

const getLocationSafetyPrecautions = async ({ params, signal }) => {
  return await axios.get(`/safety/hazard-precautions`, { params, signal })
}

const useGetLocationSafetyPrecautions = (props) => {
  return useMutation({
    mutationFn: getLocationSafetyPrecautions,
    ...props?.config,
  })
}

const getDetailLocationSafetyHazardsAndPrecautions = async ({ id, params, signal }) => {
  return await axios.get(`/safety/${id}/hazard-precautions`, { params, signal })
}

const useGetDetailLocationSafetyHazardAndPrecautions = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      getDetailLocationSafetyHazardsAndPrecautions({ id, params, ...mutationProps }),
    ...config,
  })
}

const getLocationSafetyHazardsAndPrecautions = async ({ id, params, signal }) => {
  return await axios.get(`/locations/${id}/hazard-precaution`, { params, signal })
}

const useGetLocationSafetyHazardAndPrecautionsList = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      getLocationSafetyHazardsAndPrecautions({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetLocationSafetyHazardAndPrecautionsTableList = ({ id, config, params }) => {
  return useQuery({
    ...config,
    queryKey: [
      'location-safety-hazards-and-precaution',
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getLocationSafetyHazardsAndPrecautions({ id, params, signal }),
  })
}

export {
  getLocationSafetyHazards,
  getLocationSafetyPrecautions,
  getDetailLocationSafetyHazardsAndPrecautions,
  useGetDetailLocationSafetyHazardAndPrecautions,
  useGetLocationSafetyHazards,
  useGetLocationSafetyPrecautions,
  useGetLocationSafetyHazardAndPrecautionsList,
  useGetLocationSafetyHazardAndPrecautionsTableList,
}
