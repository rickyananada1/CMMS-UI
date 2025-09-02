import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createRelation = async ({ id, data, signal }) => {
  return await axios.post(`/asset/relation`, data, { signal })
}

const useCreateRelation = (props) => {
  return useMutation({
    mutationFn: createRelation,
    ...props?.config,
  })
}

export { createRelation, useCreateRelation }
