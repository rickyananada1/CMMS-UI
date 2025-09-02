import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getTrendReport = async ({ params, signal }) => {
  return await axios.get(`/dashboard/wellness`, { params, signal })
}

const useGetTrendReport = ({ config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'dashboard-get-trend-report',
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getTrendReport({ params, signal }),
  })
}

const getAssetChanges = async ({ params, signal }) => {
  return await axios.get(`/dashboard/asset-changes`, { params, signal })
}

const useGetAssetChanges = ({ config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'dashboard-get-asset-changes',
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getAssetChanges({ params, signal }),
  })
}

export { getTrendReport, useGetTrendReport, getAssetChanges, useGetAssetChanges }
