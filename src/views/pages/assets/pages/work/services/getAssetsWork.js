import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getWorkOrders = async ({ params, signal }) => {
  return await axios.get(`/work-orders`, { params, signal })
}

const useGetWorkOrders = (props) => {
  return useMutation({
    mutationFn: getWorkOrders,
    ...props?.config,
  })
}

const getAssetsWork = async ({ id, params, signal }) => {
  return await axios.get(`/work-orders/by-asset/${id}`, { params, signal })
}

const useGetAssetsWork = (props) => {
  return useMutation({
    mutationFn: getAssetsWork,
    ...props?.config,
  })
}

const useGetAssetsWorkTableList = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['work-orders-by-assets', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getAssetsWork({ id, params, signal }),
  })
}

export {
  getWorkOrders,
  useGetWorkOrders,
  getAssetsWork,
  useGetAssetsWork,
  useGetAssetsWorkTableList,
}
