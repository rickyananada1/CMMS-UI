import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getFailureClass = async ({ params, signal }) => {
  return await axios.get(`/failure_code`, {
    params,
    signal,
  })
}

const useGetFailureClass = (props) => {
  return useMutation({
    mutationFn: getFailureClass,
    ...props,
  })
}

export { getFailureClass, useGetFailureClass }
