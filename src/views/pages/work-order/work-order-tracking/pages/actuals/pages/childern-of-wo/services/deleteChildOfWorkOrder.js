import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteChildOfWorkOrder = async ({ data, signal }) => {
  return await axios.delete(`/work-orders/${data.work_order_id}/plans/${data.work_order_plan_id}`, {
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
