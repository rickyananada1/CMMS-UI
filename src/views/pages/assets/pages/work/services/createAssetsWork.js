import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createAssetsWork = async ({ id, data, signal }) => {
  return await axios.post(`/work-orders/by-asset/${id}`, data, { signal })
}

const useCreateAssetsWork = (props) => {
  return useMutation({
    mutationFn: createAssetsWork,
    ...props?.config,
  })
}

export { createAssetsWork, useCreateAssetsWork }
