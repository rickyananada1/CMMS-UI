import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createFailureAnalysis = async ({ data, signal }) => {
  return await axios.post('/ticketecp/failure-analyst', data, { signal })
}
const useCreateFailureAnalysis = (props) => {
  return useMutation({
    mutationFn: createFailureAnalysis,
    ...props?.config,
  })
}

export { createFailureAnalysis, useCreateFailureAnalysis }
