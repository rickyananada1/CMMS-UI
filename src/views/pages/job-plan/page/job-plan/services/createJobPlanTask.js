import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createJobPlanTask = async ({ id, data, signal }) => {
  return await axios.post(`/planning/work-order-task/${id}`, data, { signal })
}

const useCreateJobPlanTask = (props) => {
  return useMutation({ mutationFn: createJobPlanTask, ...props?.config })
}

export { createJobPlanTask, useCreateJobPlanTask }
