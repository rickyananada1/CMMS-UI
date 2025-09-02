import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateJobPlanTask = async ({ data, signal }) => {
  return await axios.put(`/planning/work-order-task`, data, { signal })
}

const useUpdateJobPlanTask = (props) => {
  return useMutation({ mutationFn: updateJobPlanTask, ...props?.config })
}

export { updateJobPlanTask, useUpdateJobPlanTask }
