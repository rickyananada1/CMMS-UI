import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getJobPlanDetail = async ({ id, params, signal }) => {
  return await axios.get(`/planning/job-planning/${id}`, { params, signal })
}

const useDetailJobPlan = (props) => {
  return useMutation({
    mutationFn: getJobPlanDetail,
    ...props?.config,
  })
}

const useGetDetailJobPlan = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['detail-job-plan', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getJobPlanDetail({ id, params, signal }),
  })
}

export { getJobPlanDetail, useDetailJobPlan, useGetDetailJobPlan }
