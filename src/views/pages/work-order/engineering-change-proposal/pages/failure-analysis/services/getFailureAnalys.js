import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getFailureAnalys = async ({ id, params, signal }) => {
  return await axios.get('/ticketecp/failure-analyst/' + id, { params, signal })
}

const useGetFailureAnalys = (props) => {
  return useMutation({
    mutationFn: getFailureAnalys,
    ...props?.config,
  })
}

const useGetFailureAnalyst = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['failure-analys', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getFailureAnalys({ id, params, signal }),
  })
}

export { getFailureAnalys, useGetFailureAnalys, useGetFailureAnalyst }
