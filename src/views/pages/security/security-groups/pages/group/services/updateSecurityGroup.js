import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateSecurityGroup = async ({ id, data, signal }) => {
  return await axios.put('/security-groups/' + id, data, { signal })
}

const useUpdateSecurityGroup = (props) => {
  return useMutation({
    mutationFn: updateSecurityGroup,
    ...props?.config,
  })
}

export { updateSecurityGroup, useUpdateSecurityGroup }
