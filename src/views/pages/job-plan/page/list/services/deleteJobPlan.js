import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteJobPlan = async ({ id, signal }) => {
  return await axios.delete(`/planning/job-plan/${id}`, { signal })
}

const useDeleteJobPlan = ({ id, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => deleteJobPlan({ id, ...mutationProps }),
    ...config,
  })
}

export { deleteJobPlan, useDeleteJobPlan }
