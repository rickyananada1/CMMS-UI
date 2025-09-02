import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateLocationMeter = async ({ id, data, signal }) => {
  return await axios.put('/location-meter/' + id, data, { signal })
}

const useUpdateLocationMeter = (props) => {
  return useMutation({
    mutationFn: updateLocationMeter,
    ...props?.config,
  })
}

export { updateLocationMeter, useUpdateLocationMeter }
