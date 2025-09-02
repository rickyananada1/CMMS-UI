import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadUsers = async ({ id, data, signal }) => {
  return await axios.post(`/security-groups/${id}/users/download`, data, { signal })
}

const useDownloadUsers = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadUsers({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadUsers, useDownloadUsers }
