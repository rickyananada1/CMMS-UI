import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteLocation = async ({ id, data, signal }) => {
  return await axios.delete(`/location/${id}`, data, {
    signal,
  })
}

const useDeleteLocation = (props) => {
  return useMutation({
    mutationFn: deleteLocation,
    ...props?.config,
  })
}

export { deleteLocation, useDeleteLocation }
