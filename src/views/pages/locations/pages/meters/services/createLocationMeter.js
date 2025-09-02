import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createLocationMeter = async ({ data, signal }) => {
  return await axios.post('/location-meter', data, { signal })
}

const useCreateLocationMeter = (props) => {
  return useMutation({
    mutationFn: createLocationMeter,
    ...props?.config,
  })
}

export { createLocationMeter, useCreateLocationMeter }
