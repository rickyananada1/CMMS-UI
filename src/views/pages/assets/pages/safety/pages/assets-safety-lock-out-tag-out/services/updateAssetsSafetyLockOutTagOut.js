import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateAssetsSafetyLockOutTagOut = async ({ id, data, signal }) => {
  return await axios.put(`/assets/${id}/tag-lock`, data, { signal })
}

const useUpdateAssetsSafetyLockOutTagOut = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => updateAssetsSafetyLockOutTagOut({ id, data, ...mutationProps }),
    ...config,
  })
}

export { updateAssetsSafetyLockOutTagOut, useUpdateAssetsSafetyLockOutTagOut }
