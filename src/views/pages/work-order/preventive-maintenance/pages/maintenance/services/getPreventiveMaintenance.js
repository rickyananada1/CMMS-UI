import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getPreventiveMaintenance = async ({ id, params, signal }) => {
  return await axios.get('/preventive-maintenance/' + id, { params, signal })
}

const useGetPreventiveMaintenance = (props) => {
  return useMutation({
    mutationFn: getPreventiveMaintenance,
    ...props?.config,
  })
}

const useGetDetailPreventiveMaintenance = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'detail-preventive-maintenance',
      id,
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getPreventiveMaintenance({ id, params, signal }),
  })
}

export { getPreventiveMaintenance, useGetPreventiveMaintenance, useGetDetailPreventiveMaintenance }
