import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateFailureCode = async ({ id, data, signal }) => {
  return await axios.put(`/failure_code/${id}`, data, {
    signal,
  })
}

const useUpdateFailureCode = ({ id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => updateFailureCode({ id, params, ...mutationProps }),
    ...config,
  })
}

export { updateFailureCode, useUpdateFailureCode }
