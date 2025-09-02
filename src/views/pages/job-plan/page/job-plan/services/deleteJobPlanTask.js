import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteJobPlanTask = async ({ id, signal }) => {
  return await axios.delete(`/planning/work-order-task/${id}`, { signal })
}

const useDeleteJobPlanTask = ({ id, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => deleteJobPlanTask({ id, ...mutationProps }),
    ...config,
  })
}

export { deleteJobPlanTask, useDeleteJobPlanTask }
