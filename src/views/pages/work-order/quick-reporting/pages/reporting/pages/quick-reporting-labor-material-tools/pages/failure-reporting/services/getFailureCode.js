import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getFailureCode = async ({ id, params, signal }) => {
  return await axios.get(`/failure_code/${id}`, { params, signal })
}

const useGetFailureCode = (props) => {
  return useMutation({
    mutationFn: getFailureCode,
    ...props?.config,
  })
}

const getFailureCodeList = async ({ id, params, signal }) => {
  return await axios.get(`/work-orders/${id}/available-failure`, { params, signal })
}

const useGetFailureCodeList = (props) => {
  return useMutation({
    mutationFn: getFailureCodeList,
    ...props?.config,
  })
}

export { getFailureCode, getFailureCodeList, useGetFailureCode, useGetFailureCodeList }
