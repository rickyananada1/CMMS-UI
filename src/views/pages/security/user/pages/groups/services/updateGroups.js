import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateGroups = async ({ id, data, signal }) => {
  return await axios.put('/users/' + id + '/security-group', data, { signal })
}

const useUpdateGroups = (props) => {
  return useMutation({
    mutationFn: updateGroups,
    ...props?.config,
  })
}

export { updateGroups, useUpdateGroups }
