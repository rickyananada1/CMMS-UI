import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getLaborMaterialsTools = async ({ id, params, signal }) => {
  return await axios.get(`/work-orders/${id}/plans`, { params, signal })
}

const useGetLaborMaterialsTools_ = (props) => {
  return useMutation({
    mutationFn: getLaborMaterialsTools,
    ...props?.config,
  })
}

const useGetLaborMaterialsTools = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['work-order', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getLaborMaterialsTools({ id, params, signal }),
  })
}

export { getLaborMaterialsTools, useGetLaborMaterialsTools_, useGetLaborMaterialsTools }
