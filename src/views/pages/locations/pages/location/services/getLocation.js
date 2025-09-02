import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getListLocations = async ({ params, signal }) => {
  return await axios.get('/location', { params, signal })
}

const useGetListLocation = (props) => {
  return useMutation({
    mutationFn: getListLocations,
    ...props?.config,
  })
}

const getLocation = async ({ id, params, signal }) => {
  return await axios.get('/location/' + id, { params, signal })
}

const useGetLocation = (props) => {
  return useMutation({
    mutationFn: getLocation,
    ...props?.config,
  })
}

const useGetDetailLocation = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['detail-location', id, ...(params ? Object.values(params).filter(Boolean) : [])],
    queryFn: ({ signal }) => getLocation({ id, params, signal }),
  })
}

export { getLocation, useGetLocation, getListLocations, useGetListLocation, useGetDetailLocation }
