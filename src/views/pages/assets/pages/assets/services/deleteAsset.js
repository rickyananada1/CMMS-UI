import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteAsset = async ({ id, params, signal }) => {
  return await axios.delete(`assets/${id}`, { params, signal })
}

const useDeleteAsset = (props) => {
  return useMutation({
    mutationFn: deleteAsset,
    ...props?.config,
  })
}

export { deleteAsset, useDeleteAsset }
