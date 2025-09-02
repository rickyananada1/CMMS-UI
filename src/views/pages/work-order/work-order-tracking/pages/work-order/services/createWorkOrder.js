import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createWorkOrder = async ({ data, signal }) => {
  return await axios.post('/work-orders', data, { signal })
}

const useCreateWorkOrder = (props) => {
  return useMutation({
    mutationFn: createWorkOrder,
    ...props?.config,
  })
}

export { createWorkOrder, useCreateWorkOrder }
