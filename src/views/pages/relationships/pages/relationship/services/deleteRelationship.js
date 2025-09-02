import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteRelationship = async ({ id, data, signal }) => {
  return await axios.delete('/asset/relation/' + id, { data: data, signal })
}

const useDeleteRelationship = (props) => {
  return useMutation({
    mutationFn: deleteRelationship,
    ...props?.config,
  })
}

export { deleteRelationship, useDeleteRelationship }
