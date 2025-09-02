import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteSecurityGroup = async ({ id, params, signal }) => {
  return await axios.delete('/security-groups/' + id, { params, signal })
}

const useDeleteSecurityGroup = (props) => {
  return useMutation({
    mutationFn: deleteSecurityGroup,
    ...props?.config,
  })
}

export { deleteSecurityGroup, useDeleteSecurityGroup }
