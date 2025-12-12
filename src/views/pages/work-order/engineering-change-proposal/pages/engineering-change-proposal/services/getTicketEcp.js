/* eslint-disable */
/* prettier-ignore-start */
import { useMutation } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getWoTicketEcp = async ({ id, params, signal } = {}) => {
  return await axios.get('/ticketecp/' + id, { params, signal })
}
const useGetTicketEcp = (props) => {
  return useMutation({
    mutationFn: getWoTicketEcp,
    ...props?.config,
  })
}

export { getWoTicketEcp, useGetTicketEcp }