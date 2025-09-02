import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createFailureReporting = async ({ id, data, signal }) => {
  return await axios.post(`/work-orders/${id}/failure`, data, { signal })
}

const useCreateFailureReporting = (props) => {
  return useMutation({
    mutationFn: createFailureReporting,
    ...props?.config,
  })
}

export { useCreateFailureReporting }
