import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteUser = async ({ id, params, signal }) => {
  return await axios.delete('/users/' + id, { params, signal })
}

const useDeleteUser = (props) => {
  return useMutation({
    mutationFn: deleteUser,
    ...props?.config,
  })
}

export { deleteUser, useDeleteUser }
