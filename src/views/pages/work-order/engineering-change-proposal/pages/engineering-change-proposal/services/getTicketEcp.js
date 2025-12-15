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


const getTicketEcp = async ({ params, signal }) => {
  return await axios.get('/ticketecp/', { params, signal })
}

const useGetTicketEcps = (props) => {
  return useMutation({
    mutationFn: getTicketEcp,
    ...props?.config,
  })
}

export { getWoTicketEcp, useGetTicketEcp, getTicketEcp, useGetTicketEcps }