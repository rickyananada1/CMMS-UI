import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createTools = async ({ data, id, signal }) => {
  return await axios.post(`/work-orders/tasks/${id}/tools`, data, { signal })
}

const useCreateTools = (props) => {
  return useMutation({
    mutationFn: createTools,
    ...props?.config,
  })
}

const createToolsMultiple = async ({ data, id, signal }) => {
  return await axios.post(`/work-orders/tasks/${id}/tool-multiple`, data, { signal })
}

const useCreateToolsMultiple = (props) => {
  return useMutation({
    mutationFn: createToolsMultiple,
    ...props?.config,
  })
}

export { createTools, useCreateTools, useCreateToolsMultiple }
