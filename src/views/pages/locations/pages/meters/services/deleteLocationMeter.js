import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteLocationMeter = async ({ id, params, signal }) => {
  return await axios.delete('/location-meter/' + id, { params, signal })
}

const useDeleteLocationMeter = (props) => {
  return useMutation({
    mutationFn: deleteLocationMeter,
    ...props?.config,
  })
}

export { deleteLocationMeter, useDeleteLocationMeter }
