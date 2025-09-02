import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getSecurityGroups = async ({ params, signal }) => {
  return await axios.get('/security-groups', { params, signal })
}

const useGetSecurityGroups = (props) => {
  return useMutation({
    mutationFn: getSecurityGroups,
    ...props?.config,
  })
}

export { getSecurityGroups, useGetSecurityGroups }
