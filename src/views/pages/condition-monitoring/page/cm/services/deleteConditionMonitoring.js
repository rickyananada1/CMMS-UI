import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteConditionMonitoring = async ({ data, signal }) => {
  return await axios.delete(`asset/condition-monitoring`, { data, signal })
}

const useDeleteCM = (props) => {
  return useMutation({
    mutationFn: deleteConditionMonitoring,
    ...props?.config,
  })
}

export { deleteConditionMonitoring, useDeleteCM }
