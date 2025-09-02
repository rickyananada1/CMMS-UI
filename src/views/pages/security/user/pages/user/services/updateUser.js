import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateUser = async ({ id, data, signal }) => {
  return await axios.put('/users/' + id, data, { signal })
}

const useUpdateUser = (props) => {
  return useMutation({
    mutationFn: updateUser,
    ...props?.config,
  })
}

export { updateUser, useUpdateUser }
