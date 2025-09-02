import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getMeterGroups = async ({ params, signal }) => {
  return await axios.get('/meter-groups', { params, signal })
}

const useGetMeterGroups = ({ params, config }) => {
  return useQuery({
    ...config,
    queryKey: ['meter-groups', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getMeterGroups({ params, signal }),
  })
}

export { getMeterGroups, useGetMeterGroups }
