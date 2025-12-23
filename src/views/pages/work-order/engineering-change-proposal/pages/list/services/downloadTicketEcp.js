import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadTicketEcp = async ({ data, signal }) => {
  return await axios.post(`/ticketecps/download`, data, { signal })
}

const useDownloadTicketEcp = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadTicketEcp({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadTicketEcp, useDownloadTicketEcp }
