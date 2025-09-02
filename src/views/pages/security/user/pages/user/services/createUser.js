import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createUser = async ({ data, signal }) => {
  return await axios.post('/users/create', data, { signal })
}

const useCreateUser = (props) => {
  return useMutation({
    mutationFn: createUser,
    ...props?.config,
  })
}

export { createUser, useCreateUser }
