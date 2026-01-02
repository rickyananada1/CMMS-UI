import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createFailureAnalysis = async ({ id, params, signal } = {}) => {
  return await axios.get('/servicerequest/' + id, { params, signal })
}
const useCreateFailureAnalysis = (props) => {
  return useMutation({
    mutationFn: createFailureAnalysis,
    ...props?.config,
  })
}

export { createFailureAnalysis, useCreateFailureAnalysis }
