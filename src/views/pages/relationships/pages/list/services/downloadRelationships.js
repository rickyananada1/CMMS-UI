import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadRelationships = async ({ data, signal }) => {
  return await axios.post(`/asset/relation/download`, data, { signal })
}

const useDownloadRelationships = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadRelationships({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadRelationships, useDownloadRelationships }
