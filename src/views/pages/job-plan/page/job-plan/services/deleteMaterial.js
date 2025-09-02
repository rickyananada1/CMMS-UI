import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteMaterial = async ({ id, signal }) => {
  return await axios.delete(`/planning/work-order-material/${id}`, { signal })
}

const useDeleteJobPlanMaterial = ({ id, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => deleteMaterial({ id, ...mutationProps }),
    ...config,
  })
}

export { deleteMaterial, useDeleteJobPlanMaterial }
