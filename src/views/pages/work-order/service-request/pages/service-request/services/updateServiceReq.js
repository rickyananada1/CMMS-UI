import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateServiceReq = async ({ data, signal }) => {
  return await axios.post('/servicerequest/update-servicerequest', data, { signal })
}

const useUpdateServiceReq = (props) => {
  return useMutation({
    mutationFn: updateServiceReq,
    ...props?.config,
  })
}

export { updateServiceReq, useUpdateServiceReq }
