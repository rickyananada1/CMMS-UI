import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadMaterials = async ({ id, data, signal }) => {
  return await axios.post(`/work-orders/${id}/material-actuals/download`, data, { signal })
}

const useDownloadMaterials = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadMaterials({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadMaterials, useDownloadMaterials }
