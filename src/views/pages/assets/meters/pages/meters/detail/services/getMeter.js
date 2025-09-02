import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getMeter = async ({ id, params, signal }) => {
  return await axios.get('/meters/' + id, { params, signal })
}

const useGetMeter = (props) => {
  return useMutation({
    mutationFn: getMeter,
    ...props?.config,
  })
}

const useGetDetailMeter = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['detail-meter', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getMeter({ id, params, signal }),
  })
}

export { getMeter, useGetMeter, useGetDetailMeter }
