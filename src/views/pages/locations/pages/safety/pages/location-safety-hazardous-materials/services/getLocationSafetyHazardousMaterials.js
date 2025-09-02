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

const getLocationSafetyHazardousMaterials = async ({ id, params, signal }) => {
  return await axios.get(`/locations/${id}/hazard-material`, { params, signal })
}

const getDetailLocationSafetyHazardousMaterials = async ({ id, params, signal }) => {
  return await axios.get(`/safety/${id}/hazard-precautions`, { params, signal })
}

const useGetDetailLocationSafetyHazardousMaterials = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      getDetailLocationSafetyHazardousMaterials({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetLocationSafetyHazardousMaterialsList = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      getLocationSafetyHazardousMaterials({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetLocationSafetyHazardousMaterialsTableList = ({ id, config, params }) => {
  return useQuery({
    ...config,
    queryKey: [
      'location-safety-hazardous-material',
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getLocationSafetyHazardousMaterials({ id, params, signal }),
  })
}

export {
  getLocationSafetyHazards,
  getLocationSafetyHazardousMaterials,
  getDetailLocationSafetyHazardousMaterials,
  useGetLocationSafetyHazards,
  useGetDetailLocationSafetyHazardousMaterials,
  useGetLocationSafetyHazardousMaterialsList,
  useGetLocationSafetyHazardousMaterialsTableList,
}
