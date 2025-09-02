import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getLocation = async ({ params, signal }) => {
  return await axios.get(`/location`, { params, signal })
}

const getAsset = async ({ params, signal }) => {
  return await axios.get(`/assets`, { params, signal })
}

const getSpareparts = async ({ params, signal }) => {
  return await axios.get(`/sparepart`, { params, signal })
}

const getWorkOrder = async ({ params, signal }) => {
  return await axios.get(`/work-orders`, { params, signal })
}

const useGetLocation = (props) => {
  return useMutation({
    mutationFn: getLocation,
    ...props?.config,
  })
}

const useGetAsset = (props) => {
  return useMutation({
    mutationFn: getAsset,
    ...props?.config,
  })
}

const useGetSpareparts = (props) => {
  return useMutation({
    mutationFn: getSpareparts,
    ...props?.config,
  })
}

const useGetWorkOrder = (props) => {
  return useMutation({
    mutationFn: getWorkOrder,
    ...props?.config,
  })
}

export {
  getLocation,
  useGetLocation,
  getAsset,
  useGetAsset,
  getSpareparts,
  useGetSpareparts,
  getWorkOrder,
  useGetWorkOrder,
}
