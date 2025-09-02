import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateLocation = async ({ id, data, signal }) => {
  return await axios.put(`/location/${id}`, data, {
    signal,
  })
}

const useUpdateLocation = (props) => {
  return useMutation({
    mutationFn: updateLocation,
    ...props?.config,
  })
}

export { updateLocation, useUpdateLocation }
