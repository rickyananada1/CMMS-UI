import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getMeterGroups = async ({ params, signal }) => {
  return await axios.get('/meter-groups', { params, signal })
}

const useGetMeterGroupSelect = (props) => {
  return useMutation({
    mutationFn: getMeterGroups,
    ...props?.config,
  })
}

const getMeters = async ({ params, signal }) => {
  return await axios.get('/meters', { params, signal })
}

const useGetMeters = (props) => {
  return useMutation({
    mutationFn: getMeters,
    ...props?.config,
  })
}

export { getMeterGroups, useGetMeterGroupSelect, getMeters, useGetMeters }
