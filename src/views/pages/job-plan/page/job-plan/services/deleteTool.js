import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteTool = async ({ id, signal }) => {
  return await axios.delete(`/planning/work-order-tool/${id}`, { signal })
}

const useDeleteJobPlanTool = ({ id, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => deleteTool({ id, ...mutationProps }),
    ...config,
  })
}

export { deleteTool, useDeleteJobPlanTool }
