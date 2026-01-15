import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createFailureDefends = async ({ data, signal }) => {
  return await axios.post('/ticketecp/failure-defend-task', data, { signal })
}
const useCreateFailureDefends = (props) => {
  return useMutation({
    mutationFn: createFailureDefends,
    ...props?.config,
  })
}

export { createFailureDefends, useCreateFailureDefends }
