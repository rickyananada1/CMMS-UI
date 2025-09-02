import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateLabor = async ({ data, id, labor_id, signal }) => {
  return await axios.put(`/work-orders/tasks/${id}/labors/${labor_id}`, data, { signal })
}

const useUpdateLabor = (props) => {
  return useMutation({
    mutationFn: updateLabor,
    ...props?.config,
  })
}

export { updateLabor, useUpdateLabor }
