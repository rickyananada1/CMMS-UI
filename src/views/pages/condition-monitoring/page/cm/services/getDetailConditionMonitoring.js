import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getDetailConditionMonitoring = async ({ id, params, signal }) => {
  return await axios.get(`/asset/condition-monitoring/${id}`, { params, signal })
}

const useGetDetailConditionMonitoring = (props) => {
  return useMutation({
    mutationFn: getDetailConditionMonitoring,
    ...props?.config,
  })
}

const useDetailCM = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['detail-cm', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getDetailConditionMonitoring({ id, params, signal }),
  })
}

export { getDetailConditionMonitoring, useGetDetailConditionMonitoring, useDetailCM }
