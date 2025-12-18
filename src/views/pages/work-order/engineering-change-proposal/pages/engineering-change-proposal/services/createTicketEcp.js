import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createTicketEcp = async ({ data, signal }) => {
  return await axios.post('/ticketecp', data, { signal })
}

const useCreateTicketEcp = (props) => {
  return useMutation({
    mutationFn: createTicketEcp,
    ...props?.config,
  })
}

export { createTicketEcp, useCreateTicketEcp }
