import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateFailureDefends = async ({ data, signal }) => {
  return await axios.post('/ticketecp/update-failure-defend-task', data, { signal })
}

const useUpdateFailureDefends = (props) => {
  return useMutation({
    mutationFn: updateFailureDefends,
    ...props?.config,
  })
}

export { updateFailureDefends, useUpdateFailureDefends }
