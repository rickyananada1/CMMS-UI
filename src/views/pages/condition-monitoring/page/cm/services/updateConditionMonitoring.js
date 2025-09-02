import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateConditionMonitoring = async ({ id, data, signal }) => {
  return await axios.put(`/asset/condition-monitoring/${id}`, data, { signal })
}

const useUpdateConditionMonitoring = (props) => {
  return useMutation({
    mutationFn: updateConditionMonitoring,
    ...props?.config,
  })
}

export { updateConditionMonitoring, useUpdateConditionMonitoring }
