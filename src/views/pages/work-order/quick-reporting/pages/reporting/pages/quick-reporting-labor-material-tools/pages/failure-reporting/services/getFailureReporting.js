import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getFailureReporting = async ({ id, params, signal }) => {
  return await axios.get(`/work-orders/${id}/failure`, { params, signal })
}

const useGetFailureReportingList = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['failure_reporting_list', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getFailureReporting({ id, params, signal }),
  })
}

const useGetFailureReportingList_ = (props) => {
  return useMutation({
    mutationFn: getFailureReporting,
    ...props?.config,
  })
}

export { getFailureReporting, useGetFailureReportingList, useGetFailureReportingList_ }
