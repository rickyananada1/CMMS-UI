import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const forgotPass = async ({ data, signal }) => {
  return await axios.get('/auth/forgot-password/' + data.email, data, {
    signal,
  })
}

const useForgotPass = (props) => {
  return useMutation({
    mutationFn: forgotPass,
    ...props?.config,
  })
}

export { forgotPass, useForgotPass }
