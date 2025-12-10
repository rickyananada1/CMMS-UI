/* eslint-disable */
/* prettier-ignore-start */
import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getWoServiceRequest = async ({ id, params, signal } = {}) => {
  return await axios.get('/servicerequest/' + id, { params, signal })
}
const useGetServiceReq = (props) => {
  return useMutation({
    mutationFn: getWoServiceRequest,
    ...props?.config,
  })
}

export { getWoServiceRequest, useGetServiceReq }