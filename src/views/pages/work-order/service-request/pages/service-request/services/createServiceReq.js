import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createServiceRequest = async ({ data, signal }) => {
  return await axios.post('/servicerequest', data, { signal })
}

const useCreateServiceRequest = (props) => {
  return useMutation({
    mutationFn: createServiceRequest,
    ...props?.config,
  })
}

export { createServiceRequest, useCreateServiceRequest }
