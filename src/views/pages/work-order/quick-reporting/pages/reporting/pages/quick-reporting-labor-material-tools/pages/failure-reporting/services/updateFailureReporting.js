import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateFailureReporting = async ({ id, data, signal }) => {
  return await axios.put(`/work-orders/${id}/failure`, data, { signal })
}

const useUpdateFailureReporting = (props) => {
  return useMutation({
    mutationFn: updateFailureReporting,
    ...props?.config,
  })
}

export { useUpdateFailureReporting }
