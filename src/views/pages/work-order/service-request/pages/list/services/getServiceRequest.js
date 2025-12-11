/* eslint-disable */
/* prettier-ignore-start */
import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getServiceRequest = async ({ params, signal }) => {
  console.log(params, '[ppp');
  return await axios.get('/servicerequests', { params, signal })
}

const useGetServiceRequest = ({ config, params }) => {
  return useQuery({
    ...config,
    queryKey: ['service-request', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getServiceRequest({ params, signal }),
  })
}

export { getServiceRequest, useGetServiceRequest }
