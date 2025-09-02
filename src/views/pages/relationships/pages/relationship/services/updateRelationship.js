import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateRelationship = async ({ id, data, signal }) => {
  return await axios.put(`/asset/relation/${id}`, data, { signal })
}

const useUpdateRelationship = (props) => {
  return useMutation({
    mutationFn: updateRelationship,
    ...props?.config,
  })
}

export { updateRelationship, useUpdateRelationship }
