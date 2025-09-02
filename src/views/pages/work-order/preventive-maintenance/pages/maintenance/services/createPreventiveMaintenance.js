import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createPreventiveMaintenance = async ({ data, signal }) => {
  return await axios.post('/preventive-maintenance', data, { signal })
}

const useCreatePreventiveMaintenance = (props) => {
  return useMutation({
    mutationFn: createPreventiveMaintenance,
    ...props?.config,
  })
}

export { createPreventiveMaintenance, useCreatePreventiveMaintenance }
