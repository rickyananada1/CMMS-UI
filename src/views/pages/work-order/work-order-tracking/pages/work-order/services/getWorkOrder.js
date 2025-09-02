import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getWorkOrder = async ({ id, params, signal }) => {
  return await axios.get('/work-orders/' + id, { params, signal })
}

const useGetWorkOrder = (props) => {
  return useMutation({
    mutationFn: getWorkOrder,
    ...props?.config,
  })
}

export { getWorkOrder, useGetWorkOrder }
