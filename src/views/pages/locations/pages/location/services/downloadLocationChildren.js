import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadLocationChildren = async ({ id, data, signal }) => {
  return await axios.post(`/location/${id}/child/download`, data, { signal })
}

const useDownloadLocationChildren = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadLocationChildren({ id, data, ...mutationProps }),
    ...config,
  })
}

export { useDownloadLocationChildren, downloadLocationChildren }
