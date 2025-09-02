import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getMeters = async ({ params, signal }) => {
  return await axios.get('/meters', { params, signal })
}

const useGetMeters = ({ config, params }) => {
  return useQuery({
    ...config,
    queryKey: ['meters', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getMeters({ params, signal }),
  })
}

const useGetMetersSelect = (props) => {
  return useMutation({
    mutationFn: getMeters,
    ...props?.config,
  })
}

export { getMeters, useGetMeters, useGetMetersSelect }
