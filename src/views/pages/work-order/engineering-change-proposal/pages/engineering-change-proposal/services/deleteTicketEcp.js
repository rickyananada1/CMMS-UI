/* eslint-disable */
/* prettier-ignore-start */
import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteTicketEcp = async ({ id, signal }) => {
  return await axios.post('/ticketecp/delete-ticketecp',
    { id },
    { signal }
  )
}

const useDeleteTicketEcp = (props) => {
  return useMutation({
    mutationFn: deleteTicketEcp,
    ...props?.config,
  })
}

export { deleteTicketEcp, useDeleteTicketEcp }
