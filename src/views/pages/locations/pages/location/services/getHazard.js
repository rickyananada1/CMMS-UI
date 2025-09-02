import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getHazard = async ({ params, signal }) => {
  return await axios.get(`/safety/hazard-precautions`, {
    params,
    signal,
  })
}

const useGetHazard = (props) => {
  return useMutation({
    mutationFn: getHazard,
    ...props,
  })
}

export { getHazard, useGetHazard }
