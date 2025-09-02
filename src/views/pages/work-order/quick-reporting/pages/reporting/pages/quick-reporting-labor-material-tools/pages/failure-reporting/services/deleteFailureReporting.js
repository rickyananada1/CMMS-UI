import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteFailureReporting = async ({ parent_id, id, signal, data }) => {
  return await axios.delete(`/work-orders/${parent_id}/failure/${id}`, { data: data }, { signal })
}

const useDeleteFailureReporting = (props) => {
  return useMutation({
    mutationFn: deleteFailureReporting,
    ...props?.config,
  })
}

export { deleteFailureReporting, useDeleteFailureReporting }
