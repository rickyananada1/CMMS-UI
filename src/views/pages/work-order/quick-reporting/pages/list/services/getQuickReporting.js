import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getQuickReporting = async ({ params, signal }) => {
  return await axios.get('/work-orders', { params, signal })
}

const useGetQuickReporting = ({ config, params }) => {
  return useQuery({
    ...config,
    queryKey: ['work-order-tracking', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getQuickReporting({ params, signal }),
  })
}
export { getQuickReporting, useGetQuickReporting }
