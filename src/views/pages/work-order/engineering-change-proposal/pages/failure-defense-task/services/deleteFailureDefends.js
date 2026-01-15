/* eslint-disable */
/* prettier-ignore-start */
import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteFailureDefends = async ({ items, signal }) => {
  return await axios.post('/ticketecp/delete-failure-defend-task',
   items,
    { signal }
  )
}

const useDeleteFailureDefends = (props) => {
  return useMutation({
    mutationFn: deleteFailureDefends,
    ...props?.config,
  })
}

export { deleteFailureDefends, useDeleteFailureDefends }
