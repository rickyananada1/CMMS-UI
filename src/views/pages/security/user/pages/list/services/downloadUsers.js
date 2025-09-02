import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadUsers = async ({ data, signal }) => {
  return await axios.post(`/users/download`, data, { signal })
}

const useDownloadUsers = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadUsers({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadUsers, useDownloadUsers }
