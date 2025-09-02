import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getPreventiveMaintenances = async ({ params, signal }) => {
  return await axios.get(`/preventive-maintenance`, { params, signal })
}

const useGetListPreventiveMaintenances = ({ config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['preventive-maintenance', ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getPreventiveMaintenances({ params, signal }),
  })
}

const useGetPreventiveMaintenanceDropdown = (props) => {
  return useMutation({
    mutationFn: getPreventiveMaintenances,
    ...props?.config,
  })
}

export {
  getPreventiveMaintenances,
  useGetListPreventiveMaintenances,
  useGetPreventiveMaintenanceDropdown,
}
