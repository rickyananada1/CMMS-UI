/* eslint-disable */
/* prettier-ignore-start */
import { useMutation } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
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

const getWOTracking = async ({ params, signal }) => {
  console.log(params, 'hahahah')
  return await axios.get('/work-orders', { params, signal })
}

const useGetWOTracking = ({ config, params }) => {
  return useQuery({
    ...config,
    queryKey: ['work-order-tracking', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getWOTracking({ params, signal }),
  })
}

export { getWoServiceRequest, useGetServiceReq, useGetWOTracking }