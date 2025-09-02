import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createLabor = async ({ data, signal }) => {
  return await axios.post(`/planning/work-order-labor`, data, { signal })
}

const useCreateLabor = (props) => {
  return useMutation({ mutationFn: createLabor, ...props?.config })
}

export { createLabor, useCreateLabor }
