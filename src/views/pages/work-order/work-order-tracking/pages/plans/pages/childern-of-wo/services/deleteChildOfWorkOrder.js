import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteChildOfWorkOrder = async ({ parent_id, id, signal }) => {
  return await axios.delete(`/work-orders/${parent_id}/plans/${id}`, {
    signal,
  })
}

const useDeleteChildOfWorkOrder = (props) => {
  return useMutation({
    mutationFn: deleteChildOfWorkOrder,
    ...props?.config,
  })
}

export { deleteChildOfWorkOrder, useDeleteChildOfWorkOrder }
