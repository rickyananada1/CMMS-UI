import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadLocationSafetyLockOutTagOut = async ({ id, data, signal }) => {
  return await axios.post(`/locations/${id}/tag-lock/download`, data, { signal })
}

const useDownloadLocationSafetyLockOutTagOut = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      downloadLocationSafetyLockOutTagOut({ id, data, ...mutationProps }),
    ...config,
  })
}

export { downloadLocationSafetyLockOutTagOut, useDownloadLocationSafetyLockOutTagOut }
