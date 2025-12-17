/* eslint-disable */
/* prettier-ignore-start */
import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteServiceRequest = async ({ id, signal }) => {
  return await axios.post('/servicerequest/delete-servicerequest',
    { id },
    { signal }
  )
}

const useDeleteServiceRequest = (props) => {
  return useMutation({
    mutationFn: deleteServiceRequest,
    ...props?.config,
  })
}

export { deleteServiceRequest, useDeleteServiceRequest }
