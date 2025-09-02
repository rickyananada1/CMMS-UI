import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteSite = async ({ id, data, signal }) => {
  return await axios.delete(`/security-groups/${id}/sites`, { data: data, signal })
}

const useDeleteSite = (props) => {
  return useMutation({
    mutationFn: deleteSite,
    ...props?.config,
  })
}
export { deleteSite, useDeleteSite }
