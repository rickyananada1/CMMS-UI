import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createRelationship = async ({ id, data, signal }) => {
  return await axios.post(`/asset/relation`, data, { signal })
}

const useCreateRelationship = (props) => {
  return useMutation({
    mutationFn: createRelationship,
    ...props?.config,
  })
}

export { createRelationship, useCreateRelationship }
