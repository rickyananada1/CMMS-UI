import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getLocationMeter = async ({ id, params, signal }) => {
  return await axios.get('/location-meter/' + id, { params, signal })
}

const useGetLocationMeter = (props) => {
  return useMutation({
    mutationFn: getLocationMeter,
    ...props?.config,
  })
}

export { getLocationMeter, useGetLocationMeter }
