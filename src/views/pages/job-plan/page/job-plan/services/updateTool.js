import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateTool = async ({ data, signal }) => {
  return await axios.put(`/planning/work-order-tools`, data, { signal })
}

const useUpdateTool = (props) => {
  return useMutation({ mutationFn: updateTool, ...props?.config })
}

export { updateTool, useUpdateTool }
