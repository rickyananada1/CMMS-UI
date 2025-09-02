import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadAssetsSafetyLockOutTagOut = async ({ id, data, signal }) => {
  return await axios.post(`/assets/${id}/tag-lock/download`, data, { signal })
}

const useDownloadAssetsSafetyLockOutTagOut = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      downloadAssetsSafetyLockOutTagOut({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadAssetsSafetyLockOutTagOut, useDownloadAssetsSafetyLockOutTagOut }
