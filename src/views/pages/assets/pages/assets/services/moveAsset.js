import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const moveAsset = async ({ id, data, signal }) => {
  return await axios.put(`/assets/${id}/move`, data, { signal })
}

const useMoveAsset = (props) => {
  return useMutation({
    mutationFn: moveAsset,
    ...props?.config,
  })
}

export { moveAsset, useMoveAsset }
