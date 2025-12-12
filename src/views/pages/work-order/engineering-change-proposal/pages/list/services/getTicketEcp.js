import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getTicketEcp = async ({ params, signal }) => {
  return await axios.get('/ticketecp', { params, signal })
}

const useGetTicketEcp = ({ config, params }) => {
  return useQuery({
    ...config,
    queryKey: ['ticket-ecp', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getTicketEcp({ params, signal }),
  })
}
export { getTicketEcp, useGetTicketEcp }
