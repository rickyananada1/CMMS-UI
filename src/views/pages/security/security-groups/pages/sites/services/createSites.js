import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createSite = async ({ id, data, signal }) => {
  return await axios.post(`/security-groups/${id}/sites`, data, {
    signal,
  })
}

const useCreateSite = ({ id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => createSite({ id, params, ...mutationProps }),
    ...config,
  })
}

export { createSite, useCreateSite }
