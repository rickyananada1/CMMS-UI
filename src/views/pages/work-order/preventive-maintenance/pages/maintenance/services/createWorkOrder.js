import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createPMWorkOrder = async ({ id, data, signal }) => {
  return await axios.post(`/preventive-maintenance/${id}/work-order`, data, { signal })
}

const useCreatePMWorkOrder = (props) => {
  return useMutation({
    mutationFn: createPMWorkOrder,
    ...props?.config,
  })
}

export { createPMWorkOrder, useCreatePMWorkOrder }
