import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getAssets = async ({ params, signal }) => {
  return await axios.get(`/assets`, {
    params,
    signal,
  })
}

const useGetAssets = (props) => {
  return useMutation({
    mutationFn: getAssets,
    ...props,
  })
}

export { getAssets, useGetAssets }
