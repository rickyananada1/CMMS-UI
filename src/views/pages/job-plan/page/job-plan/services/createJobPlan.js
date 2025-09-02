import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createJobPlan = async ({ data, signal }) => {
  return await axios.post('/planning/job-plan', data, { signal })
}

const useCreateJobPlan = (props) => {
  return useMutation({
    mutationFn: createJobPlan,
    ...props?.config,
  })
}

export { createJobPlan, useCreateJobPlan }
