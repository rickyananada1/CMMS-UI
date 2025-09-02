import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getRotatingItem = async ({ params, signal }) => {
  return await axios.get(`/rotating-item`, {
    params,
    signal,
  })
}

const useGetRotatingItem = (props) => {
  return useMutation({
    mutationFn: getRotatingItem,
    ...props,
  })
}

export { getRotatingItem, useGetRotatingItem }
