import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteWorkOrder = async ({ id, params, signal }) => {
  return await axios.delete('/work-orders/' + id, { params, signal })
}

const useDeleteWorkOrder = (props) => {
  return useMutation({
    mutationFn: deleteWorkOrder,
    ...props?.config,
  })
}

export { deleteWorkOrder, useDeleteWorkOrder }
