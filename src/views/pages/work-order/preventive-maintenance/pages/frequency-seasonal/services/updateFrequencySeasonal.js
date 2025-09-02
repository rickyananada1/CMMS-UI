import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateFrequencySeasonal = async ({ id, data, signal }) => {
  return await axios.put(`/preventive-maintenance/${id}/frequency`, data, { signal })
}

const useUpdateFrequencySeasonal = (props) => {
  return useMutation({
    mutationFn: updateFrequencySeasonal,
    ...props?.config,
  })
}

export { updateFrequencySeasonal, useUpdateFrequencySeasonal }
