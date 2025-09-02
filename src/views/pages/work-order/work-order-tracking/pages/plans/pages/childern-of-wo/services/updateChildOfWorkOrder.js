import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateChildOfWorkOrder = async ({ data, id, plan_id, signal }) => {
  return await axios.put(`/work-orders/${id}/plans/${plan_id}`, data, { signal })
}

const useUpdateChildOfWorkOrder = (props) => {
  return useMutation({
    mutationFn: updateChildOfWorkOrder,
    ...props?.config,
  })
}

export { updateChildOfWorkOrder, useUpdateChildOfWorkOrder }
