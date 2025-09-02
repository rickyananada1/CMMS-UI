import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteFailureCode = async ({ id, data, signal }) => {
  return await axios.delete(`/failure_code/${id}`, data, {
    signal,
  })
}

const useDeleteFailureCode = (props) => {
  return useMutation({
    mutationFn: deleteFailureCode,
    ...props?.config,
  })
}

export { deleteFailureCode, useDeleteFailureCode }
