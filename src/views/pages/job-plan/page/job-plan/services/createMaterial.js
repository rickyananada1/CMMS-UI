import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createMaterial = async ({ data, signal }) => {
  return await axios.post(`/planning/work-order-materials`, data, { signal })
}

const useCreateMaterial = (props) => {
  return useMutation({ mutationFn: createMaterial, ...props?.config })
}

export { createMaterial, useCreateMaterial }
