import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateJobPlan = async ({ id, data, signal }) => {
  return await axios.put(`/planning/job-plan/${id}`, data, { signal })
}

const useUpdateJobPlan = (props) => {
  return useMutation({ mutationFn: updateJobPlan, ...props?.config })
}

export { updateJobPlan, useUpdateJobPlan }
