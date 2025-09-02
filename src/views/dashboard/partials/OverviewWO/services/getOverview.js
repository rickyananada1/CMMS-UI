import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getOverview = async ({ params, signal }) => {
  return await axios.get(`/dashboard/work-orders`, {
    params,
    signal,
  })
}

const useGetOverview = (props) => {
  return useMutation({
    mutationFn: getOverview,
    ...props?.config,
  })
}

export { getOverview, useGetOverview }
