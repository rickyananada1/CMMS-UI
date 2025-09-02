import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getDetailJobPlanTask = async ({ id, params, signal }) => {
  return await axios.get(`/planning/job-planning/${id}/work-order-task`, { id, params, signal })
}

const useGetDetailJobPlanTask = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['job-plan-task', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getDetailJobPlanTask({ id, params, signal }),
    enabled: !!id,
  })
}

const useGetJobPlanTaksDropdown = (props) => {
  return useMutation({
    mutationFn: getDetailJobPlanTask,
    ...props?.config,
  })
}

export { getDetailJobPlanTask, useGetDetailJobPlanTask, useGetJobPlanTaksDropdown }
