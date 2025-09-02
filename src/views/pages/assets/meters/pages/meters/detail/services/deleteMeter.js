import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteMeter = async ({ id, params, signal }) => {
  return await axios.delete('/meters/' + id, { params, signal })
}

const useDeleteMeter = (props) => {
  return useMutation({
    mutationFn: deleteMeter,
    ...props?.config,
  })
}

export { deleteMeter, useDeleteMeter }
