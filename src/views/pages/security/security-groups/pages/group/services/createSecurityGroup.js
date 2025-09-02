import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createSecurityGroup = async ({ data, signal }) => {
  return await axios.post('/security-groups', data, { signal })
}

const useCreateSecurityGroup = (props) => {
  return useMutation({
    mutationFn: createSecurityGroup,
    ...props?.config,
  })
}

export { createSecurityGroup, useCreateSecurityGroup }
