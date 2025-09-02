import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deletePreventiveMaintenance = async ({ id, signal }) => {
  return await axios.delete(`/preventive-maintenance/${id}`, { signal })
}

const useDeletePreventiveMaintenance = ({ id, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => deletePreventiveMaintenance({ id, ...mutationProps }),
    ...config,
  })
}

export { deletePreventiveMaintenance, useDeletePreventiveMaintenance }
