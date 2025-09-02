import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createLocationAssets = async ({ id, data, signal }) => {
  return await axios.post(`/location/${id}/assets/create`, data, { signal })
}

const useCreateLocationAssets = (props) => {
  return useMutation({
    mutationFn: createLocationAssets,
    ...props?.config,
  })
}

export { createLocationAssets, useCreateLocationAssets }
