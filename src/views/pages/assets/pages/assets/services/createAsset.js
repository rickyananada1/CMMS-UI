import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createAsset = async ({ data, signal }) => {
  return await axios.post('/assets/create', data, { signal })
}

const useCreateAsset = (props) => {
  return useMutation({
    mutationFn: createAsset,
    ...props?.config,
  })
}

export { createAsset, useCreateAsset }
