import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getDetailJobPlanMaterial = async ({ id, params, signal }) => {
  return await axios.get(`/planning/job-planning/${id}/work-order-materials`, { params, signal })
}

const useGetDetailJobPlanMaterial = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['job-plan-material', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getDetailJobPlanMaterial({ id, params, signal }),
  })
}

const useGetJobPlanMaterialDropdown = (props) => {
  return useMutation({
    mutationFn: getDetailJobPlanMaterial,
    ...props?.config,
  })
}

export { getDetailJobPlanMaterial, useGetDetailJobPlanMaterial, useGetJobPlanMaterialDropdown }
