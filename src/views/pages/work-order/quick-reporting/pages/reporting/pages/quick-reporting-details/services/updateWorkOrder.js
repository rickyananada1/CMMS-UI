import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateWorkOrder = async ({ id, data, signal }) => {
  return await axios.put('/work-orders/' + id, data, { signal })
}

const useUpdateWorkOrder = (props) => {
  return useMutation({
    mutationFn: updateWorkOrder,
    ...props?.config,
  })
}

export { updateWorkOrder, useUpdateWorkOrder }
