import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteLabor = async ({ id, signal }) => {
  return await axios.delete(`/planning/work-order-labor/${id}`, { signal })
}

const useDeleteJobPlanLabor = ({ id, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => deleteLabor({ id, ...mutationProps }),
    ...config,
  })
}

export { deleteLabor, useDeleteJobPlanLabor }
