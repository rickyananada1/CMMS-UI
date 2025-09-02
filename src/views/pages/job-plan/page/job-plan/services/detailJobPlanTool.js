import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getDetailJobPlanTool = async ({ id, params, signal }) => {
  return await axios.get(`/planning/job-planning/${id}/work-order-tools`, { params, signal })
}

const useGetDetailJobPlanTool = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['job-plan-tool', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getDetailJobPlanTool({ id, params, signal }),
  })
}

const useGetJobPlanToolDropdown = (props) => {
  return useMutation({
    mutationFn: getDetailJobPlanTool,
    ...props?.config,
  })
}

export { getDetailJobPlanTool, useGetDetailJobPlanTool, useGetJobPlanToolDropdown }
