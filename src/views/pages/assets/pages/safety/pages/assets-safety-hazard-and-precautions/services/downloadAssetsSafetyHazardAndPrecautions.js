import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadAssetsSafetyHazardAndPrecautions = async ({ id, data, signal }) => {
  return await axios.post(`/assets/${id}/hazard-precaution/download`, data, { signal })
}

const useDownloadAssetsSafetyHazardAndPrecautions = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      downloadAssetsSafetyHazardAndPrecautions({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadAssetsSafetyHazardAndPrecautions, useDownloadAssetsSafetyHazardAndPrecautions }
