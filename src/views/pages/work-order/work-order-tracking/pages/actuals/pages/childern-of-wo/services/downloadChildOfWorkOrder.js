import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadChildren = async ({ id, data, signal }) => {
  return await axios.post(`/work-orders/${id}/plan-actuals/download`, data, { signal })
}

const useDownloadChildren = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadChildren({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadChildren, useDownloadChildren }
