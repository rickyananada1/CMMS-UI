import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getRecentReport = async ({ params, signal }) => {
  return await axios.get(`/dashboard/recent-reports`, {
    params,
    signal,
  })
}

const useGetRecentReport = (props) => {
  return useMutation({
    mutationFn: getRecentReport,
    ...props?.config,
  })
}

export { getRecentReport, useGetRecentReport }
