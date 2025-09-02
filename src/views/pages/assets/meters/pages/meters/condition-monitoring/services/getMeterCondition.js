import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getMeterCondition = async ({ id, params, signal }) => {
  return await axios.get(`/meters/${id}/condition-monitoring`, { id, params, signal })
}

const useGetMeterCondition = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['meter-condition', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getMeterCondition({ id, params, signal }),
  })
}

export { getMeterCondition, useGetMeterCondition }
