import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createLabor = async ({ data, id, signal }) => {
  return await axios.post(`/work-orders/tasks/${id}/labors`, data, { signal })
}

const useCreateLabor = (props) => {
  return useMutation({
    mutationFn: createLabor,
    ...props?.config,
  })
}

const createLaborMultiple = async ({ data, id, signal }) => {
  return await axios.post(`/work-orders/tasks/${id}/labor-multiple`, data, { signal })
}

const useCreateLaborMultiple = (props) => {
  return useMutation({
    mutationFn: createLaborMultiple,
    ...props?.config,
  })
}

export { createLabor, useCreateLabor, useCreateLaborMultiple }
