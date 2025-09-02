import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createWOManual = async ({ id, params, signal }) => {
  return await axios.post(`/preventive-maintenance/${id}/work-order`, { params, signal })
}

const useCreateWOManual = (props) => {
  return useMutation({
    mutationFn: createWOManual,
    ...props?.config,
  })
}

export { createWOManual, useCreateWOManual }
