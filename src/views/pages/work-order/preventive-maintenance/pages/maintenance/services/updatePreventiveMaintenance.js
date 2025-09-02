import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updatePreventiveMaintenance = async ({ id, data, signal }) => {
  return await axios.put(`/preventive-maintenance/${id}`, data, { signal })
}

const useUpdatePreventiveMaintenance = (props) => {
  return useMutation({
    mutationFn: updatePreventiveMaintenance,
    ...props?.config,
  })
}

export { updatePreventiveMaintenance, useUpdatePreventiveMaintenance }
