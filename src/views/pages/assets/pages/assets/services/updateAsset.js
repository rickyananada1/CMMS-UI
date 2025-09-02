import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateAsset = async ({ id, data, signal }) => {
  return await axios.put(`/assets/${id}`, data, { signal })
}

const useUpdateAsset = (props) => {
  return useMutation({
    mutationFn: updateAsset,
    ...props?.config,
  })
}

export { updateAsset, useUpdateAsset }
