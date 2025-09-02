import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getConditionMonitoring = async ({ params, signal }) => {
  return await axios.get('/asset/condition-monitoring', { params, signal })
}

const useGetConditionMonitoring = ({ config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['condition-monitoring', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getConditionMonitoring({ params, signal }),
  })
}

export { getConditionMonitoring, useGetConditionMonitoring }
