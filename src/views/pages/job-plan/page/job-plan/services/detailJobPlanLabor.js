import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getDetailJobPlanLabor = async ({ id, params, signal }) => {
  return await axios.get(`/planning/job-planning/${id}/work-order-labor`, { params, signal })
}

const useGetDetailJobPlanLabor = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['job-plan-labor', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getDetailJobPlanLabor({ id, params, signal }),
  })
}

const useGetJobPlanLaborDropdown = (props) => {
  return useMutation({
    mutationFn: getDetailJobPlanLabor,
    ...props?.config,
  })
}

export { getDetailJobPlanLabor, useGetDetailJobPlanLabor, useGetJobPlanLaborDropdown }
