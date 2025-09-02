import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const resetFrequencySeasonal = async ({ id, params, signal }) => {
  return await axios.delete(`/preventive-maintenance/${id}/frequency`, { params, signal })
}

const useResetFrequencySeasonal = (props) => {
  return useMutation({
    mutationFn: resetFrequencySeasonal,
    ...props?.config,
  })
}

export { resetFrequencySeasonal, useResetFrequencySeasonal }
