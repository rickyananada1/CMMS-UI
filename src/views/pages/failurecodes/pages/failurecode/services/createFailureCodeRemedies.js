import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createFailureCodeRemedies = async ({ data, signal }) => {
  return await axios.post(`/failure_code_remedy`, data, {
    signal,
  })
}

const useCreateFailureCodeRemedies = ({ config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => createFailureCodeRemedies({ params, ...mutationProps }),
    ...config,
  })
}

export { createFailureCodeRemedies, useCreateFailureCodeRemedies }
