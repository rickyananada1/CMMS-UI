import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getMeterGroup = async ({ params, signal }) => {
  return await axios.get(`/meter-groups`, {
    params,
    signal,
  })
}

const useGetMeterGroup = (props) => {
  return useMutation({
    mutationFn: getMeterGroup,
    ...props,
  })
}

export { getMeterGroup, useGetMeterGroup }
