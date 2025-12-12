import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateTicketEcp = async ({ data, signal }) => {
  return await axios.post('/update-ticketecp', data, { signal })
}

const useUpdateTicketEcp = (props) => {
  return useMutation({
    mutationFn: updateTicketEcp,
    ...props?.config,
  })
}

export { updateTicketEcp, useUpdateTicketEcp }
