import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateLabor = async ({ data, signal }) => {
  return await axios.put(`/planning/work-order-labor`, data, { signal })
}

const useUpdateLabor = (props) => {
  return useMutation({ mutationFn: updateLabor, ...props?.config })
}

export { updateLabor, useUpdateLabor }
