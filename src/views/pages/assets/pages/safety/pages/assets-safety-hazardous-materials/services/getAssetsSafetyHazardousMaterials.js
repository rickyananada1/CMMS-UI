import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getAssetsSafetyHazards = async ({ params, signal }) => {
  return await axios.get(`/safety/hazard-materials`, { params, signal })
}

const useGetAssetsSafetyHazards = (props) => {
  return useMutation({
    mutationFn: getAssetsSafetyHazards,
    ...props?.config,
  })
}

const getAssetsSafetyHazardousMaterials = async ({ id, params, signal }) => {
  return await axios.get(`/assets/${id}/hazard-material`, { params, signal })
}

const getDetailAssetsSafetyHazardousMaterials = async ({ id, params, signal }) => {
  return await axios.get(`/safety/${id}/hazard-precautions`, { params, signal })
}

const useGetDetailAssetsSafetyHazardousMaterials = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      getDetailAssetsSafetyHazardousMaterials({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetAssetsSafetyHazardousMaterialsList = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      getAssetsSafetyHazardousMaterials({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetAssetsSafetyHazardousMaterialsTableList = ({ id, config, params }) => {
  return useQuery({
    ...config,
    queryKey: [
      'assets-safety-hazardous-material',
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getAssetsSafetyHazardousMaterials({ id, params, signal }),
  })
}

export {
  getAssetsSafetyHazards,
  getAssetsSafetyHazardousMaterials,
  getDetailAssetsSafetyHazardousMaterials,
  useGetAssetsSafetyHazards,
  useGetDetailAssetsSafetyHazardousMaterials,
  useGetAssetsSafetyHazardousMaterialsList,
  useGetAssetsSafetyHazardousMaterialsTableList,
}
