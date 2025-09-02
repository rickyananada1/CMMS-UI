import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteRelation = async ({ id, data, signal }) => {
  return await axios.delete(`/asset/relation/${id}`, { data: data, signal })
}

const useDeleteRelation = (props) => {
  return useMutation({
    mutationFn: deleteRelation,
    ...props?.config,
  })
}

export { deleteRelation, useDeleteRelation }
