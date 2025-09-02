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

const getAssetsSafetyPrecautions = async ({ params, signal }) => {
  return await axios.get(`/safety/hazard-precautions`, { params, signal })
}

const useGetAssetsSafetyPrecautions = (props) => {
  return useMutation({
    mutationFn: getAssetsSafetyPrecautions,
    ...props?.config,
  })
}

const getDetailAssetsSafetyHazardsAndPrecautions = async ({ id, params, signal }) => {
  return await axios.get(`/safety/${id}/hazard-precautions`, { params, signal })
}

const useGetDetailAssetsSafetyHazardAndPrecautions = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      getDetailAssetsSafetyHazardsAndPrecautions({ id, params, ...mutationProps }),
    ...config,
  })
}

const getAssetsSafetyHazardsAndPrecautions = async ({ id, params, signal }) => {
  return await axios.get(`/assets/${id}/hazard-precaution`, { params, signal })
}

const useGetAssetsSafetyHazardAndPrecautionsList = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      getAssetsSafetyHazardsAndPrecautions({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetAssetsSafetyHazardAndPrecautionsTableList = ({ id, config, params }) => {
  return useQuery({
    ...config,
    queryKey: [
      'assets-safety-hazards-and-precaution',
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getAssetsSafetyHazardsAndPrecautions({ id, params, signal }),
  })
}

export {
  getAssetsSafetyHazards,
  getAssetsSafetyPrecautions,
  getDetailAssetsSafetyHazardsAndPrecautions,
  useGetDetailAssetsSafetyHazardAndPrecautions,
  useGetAssetsSafetyHazards,
  useGetAssetsSafetyPrecautions,
  useGetAssetsSafetyHazardAndPrecautionsList,
  useGetAssetsSafetyHazardAndPrecautionsTableList,
}
