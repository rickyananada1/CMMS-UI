import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateSite = async ({ id, data, signal }) => {
  return await axios.put(`/security-groups/${id}/sites`, data, {
    signal,
  })
}

const useUpdateSite = ({ id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => updateSite({ id, params, ...mutationProps }),
    ...config,
  })
}

export { updateSite, useUpdateSite }
