import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateRelation = async ({ id, data, signal }) => {
  return await axios.put(`/asset/relation/${id}`, data, { signal })
}

const useUpdateRelation = (props) => {
  return useMutation({
    mutationFn: updateRelation,
    ...props?.config,
  })
}

export { updateRelation, useUpdateRelation }
