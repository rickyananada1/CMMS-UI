/* eslint-disable */
/* prettier-ignore-start */
import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getDetailFailure = async ({ id, params, signal } = {}) => {
  return await axios.get('/ticketecp/failure-analyst/' + id, { params, signal })
}
const useGetDetailFailure = (props) => {
  return useMutation({
    mutationFn: getDetailFailure,
    ...props?.config,
  })
}


export { getDetailFailure, useGetDetailFailure }