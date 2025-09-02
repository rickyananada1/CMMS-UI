import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateFailureCodeRemedies = async ({ cause_id, remedies_id, data, signal }) => {
  return await axios.put(`/failure_code/cause/${cause_id}/remedy/${remedies_id}`, data, {
    signal,
  })
}

const useUpdateFailureCodeRemedies = ({ cause_id, remedies_id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      updateFailureCodeRemedies({ cause_id, remedies_id, params, ...mutationProps }),
    ...config,
  })
}

export { updateFailureCodeRemedies, useUpdateFailureCodeRemedies }
