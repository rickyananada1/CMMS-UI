import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createLocation = async ({ data, signal }) => {
  return await axios.post(`/location`, data, {
    signal,
  })
}

const useCreateLocation = (props) => {
  return useMutation({
    mutationFn: createLocation,
    ...props?.config,
  })
}

export { createLocation, useCreateLocation }
