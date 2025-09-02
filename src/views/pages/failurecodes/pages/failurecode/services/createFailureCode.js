import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createFailureCode = async ({ data, signal }) => {
  return await axios.post(`/failure_code`, data, {
    signal,
  })
}

const useCreateFailureCode = ({ config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => createFailureCode({ params, ...mutationProps }),
    ...config,
  })
}

export { createFailureCode, useCreateFailureCode }
