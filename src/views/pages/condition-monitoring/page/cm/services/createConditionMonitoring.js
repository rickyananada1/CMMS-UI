import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createConditionMonitoring = async ({ data, signal }) => {
  return await axios.post(`/asset/condition-monitoring`, data, { signal })
}

const useCreateConditionMonitoring = (props) => {
  return useMutation({
    mutationFn: createConditionMonitoring,
    ...props?.config,
  })
}

export { createConditionMonitoring, useCreateConditionMonitoring }
