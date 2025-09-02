import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createTool = async ({ data, signal }) => {
  return await axios.post(`/planning/work-order-tools`, data, { signal })
}

const useCreateTool = (props) => {
  return useMutation({ mutationFn: createTool, ...props?.config })
}

export { createTool, useCreateTool }
