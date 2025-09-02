import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadRelation = async ({ id, data, signal }) => {
  return await axios.post(`/asset/relation/${id}/download`, data, { signal })
}

const useDownloadRelation = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadRelation({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadRelation, useDownloadRelation }
