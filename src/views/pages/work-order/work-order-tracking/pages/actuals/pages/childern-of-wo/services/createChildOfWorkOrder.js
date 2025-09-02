import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createChildOfWorkOrder = async ({ data, id, signal }) => {
  return await axios.post(`/work-orders/${id}/plans`, data, { signal })
}

const useCreateChildOfWorkOrder = (props) => {
  return useMutation({
    mutationFn: createChildOfWorkOrder,
    ...props?.config,
  })
}

export { createChildOfWorkOrder, useCreateChildOfWorkOrder }
