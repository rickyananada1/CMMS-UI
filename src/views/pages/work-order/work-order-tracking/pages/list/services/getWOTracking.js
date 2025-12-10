import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

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
export { getWOTracking, useGetWOTracking }
