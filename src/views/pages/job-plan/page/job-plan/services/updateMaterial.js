import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateMaterial = async ({ data, signal }) => {
  return await axios.put(`/planning/work-order-materials`, data, { signal })
}

const useUpdateMaterial = (props) => {
  return useMutation({ mutationFn: updateMaterial, ...props?.config })
}

export { updateMaterial, useUpdateMaterial }
