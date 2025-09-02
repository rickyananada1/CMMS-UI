import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadLabor = async ({ id, data, signal }) => {
  return await axios.post(`/work-orders/${id}/labor-actuals/download`, data, { signal })
}

const useDownloadLabor = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadLabor({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadLabor, useDownloadLabor }
