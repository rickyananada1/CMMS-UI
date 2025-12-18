/* eslint-disable */
/* prettier-ignore-start */
import { useMutation } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
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

const getWOTracking = async ({ signal }) => {
  const state = store.getState()
  const srId = state.serviceRequest?.selectedServiceRequest?.uuid
  if (!srId) {
    throw new Error('Service Request ID is missing')
  }

  return axios.get(`/servicerequestWo/${srId}`, {
    signal,
  })
}

const useGetTableServiceWO = () => {
  const srId = useSelector(
    (state) => state.serviceRequest?.selectedServiceRequest?.uuid
  )
  return useQuery({
    queryKey: ['table-service-wo', srId],
    queryFn: async ({ signal }) => {
      return axios.get(`/servicerequestWo/${srId}`, { signal })
    },
    enabled: !!srId,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
  })
}

export { getWoServiceRequest, useGetServiceReq, useGetTableServiceWO }