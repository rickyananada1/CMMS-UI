import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getMaterials = async ({ id, params, signal }) => {
  return await axios.get(`/work-orders/${id}/tasks`, { params, signal })
}

const getMaterialsList = async ({ id, params, signal }) => {
  return await axios.get(`/work-orders/tasks/${id}/materials`, { params, signal })
}

const getDetailMaterials = async ({ id, material_id, params, signal }) => {
  return await axios.get(`/work-orders/tasks/${id}/materials/${material_id}`, { params, signal })
}

const useGetMaterials_ = ({ id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => getMaterials({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetMaterialsList = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => getMaterialsList({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetMaterials = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'work-order-materials',
      id,
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getMaterialsList({ id, params, signal }),
  })
}

const useGetDetailMaterials = ({ id, material_id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => getDetailMaterials({ id, material_id, params, mutationProps }),
    ...config,
  })
}

export {
  getMaterials,
  useGetMaterials_,
  useGetMaterials,
  getDetailMaterials,
  useGetDetailMaterials,
  useGetMaterialsList,
}
