import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createLabor = async ({ data, id, signal }) => {
  return await axios.post(`/work-orders/tasks/${id}/labors`, data, { signal })
}

const useCreateLabor = (props) => {
  return useMutation({
    mutationFn: createLabor,
    ...props?.config,
  })
}

export { createLabor, useCreateLabor }
