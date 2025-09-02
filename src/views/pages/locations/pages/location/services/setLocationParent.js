import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const setLocationParent = async ({ id, data, signal }) => {
  return await axios.put(`/location/${id}/parent`, data, {
    signal,
  })
}

const useSetLocationParent = ({ id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => setLocationParent({ id, params, ...mutationProps }),
    ...config,
  })
}

export { setLocationParent, useSetLocationParent }
