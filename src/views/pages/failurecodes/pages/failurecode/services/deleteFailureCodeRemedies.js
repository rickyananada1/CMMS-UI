import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteFailureCodeRemedies = async ({ cause_id, remedies_id, data, signal }) => {
  return await axios.delete(`/failure_code/cause/${cause_id}/remedy/${remedies_id}`, data, {
    signal,
  })
}

const useDeleteFailureCodeRemedies = (props) => {
  return useMutation({
    mutationFn: deleteFailureCodeRemedies,
    ...props?.config,
  })
}

export { deleteFailureCodeRemedies, useDeleteFailureCodeRemedies }
