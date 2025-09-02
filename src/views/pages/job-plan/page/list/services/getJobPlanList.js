import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getJobPlanList = async ({ params, signal }) => {
  return await axios.get('/planning/job-planning', { params, signal })
}

const useGetJobPlanList = ({ config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['job-plan-list', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getJobPlanList({ params, signal }),
  })
}

const useGetJobPlanDropdown = (props) => {
  return useMutation({
    mutationFn: getJobPlanList,
    ...props?.config,
  })
}

export { getJobPlanList, useGetJobPlanList, useGetJobPlanDropdown }
