import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getFailureCodes = async ({ params, signal }) => {
  return await axios.get('/failure_code', { params, signal })
}

const useGetFailureCodesTableList = ({ config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['failure_code_list', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getFailureCodes({ params, signal }),
  })
}

export { getFailureCodes, useGetFailureCodesTableList }
