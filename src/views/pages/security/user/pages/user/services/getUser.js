import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getUser = async ({ id, params, signal }) => {
  return await axios.get('/users/' + id, { params, signal })
}

const useGetUser = (props) => {
  return useMutation({
    mutationFn: getUser,
    ...props?.config,
  })
}

const useGetDetailUser = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'detail-preventive-maintenance',
      id,
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getUser({ id, params, signal }),
  })
}

export { getUser, useGetUser, useGetDetailUser }
