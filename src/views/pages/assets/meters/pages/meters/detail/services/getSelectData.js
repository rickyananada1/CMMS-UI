import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getDomains = async ({ params, signal }) => {
  return await axios.get('/meters/domains', { params, signal })
}

const useGetDomains = (props) => {
  return useMutation({
    mutationFn: getDomains,
    ...props?.config,
  })
}

const getReadingTypes = async ({ params, signal }) => {
  return await axios.get('/meters/reading-types', { params, signal })
}

const useGetReadingTypes = (props) => {
  return useMutation({
    mutationFn: getReadingTypes,
    ...props?.config,
  })
}

const getUoms = async ({ params, signal }) => {
  return await axios.get('/meters/uoms', { params, signal })
}

const useGetUoms = (props) => {
  return useMutation({
    mutationFn: getUoms,
    ...props?.config,
  })
}

export { getDomains, useGetDomains, getReadingTypes, useGetReadingTypes, getUoms, useGetUoms }
