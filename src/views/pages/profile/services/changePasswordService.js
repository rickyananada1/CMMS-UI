import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const changePasswordService = async ({ data, signal }) => {
  return await axios.put('/users/change-password', data, { signal })
}

const useChangePasswordService = (props) => {
  return useMutation({
    mutationFn: changePasswordService,
    ...props?.config,
  })
}

export { changePasswordService, useChangePasswordService }
