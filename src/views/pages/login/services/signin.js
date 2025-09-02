import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const signin = async ({ data, signal }) => {
  return await axios.post('/auth/signin', data, {
    signal,
  })
}

const useSignin = (props) => {
  return useMutation({
    mutationFn: signin,
    ...props?.config,
  })
}

const signout = async ({ signal }) => {
  return await axios.post('/auth/signout', null, {
    signal,
  })
}

const useSignout = (props) => {
  return useMutation({
    mutationFn: signout,
    ...props?.config,
  })
}

export { signin, useSignin, signout, useSignout }
