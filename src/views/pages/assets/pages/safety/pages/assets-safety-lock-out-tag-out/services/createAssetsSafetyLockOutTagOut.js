import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createAssetsSafetyLockOutTagOut = async ({ id, data, signal }) => {
  return await axios.post(`/assets/${id}/tag-lock`, data, { signal })
}

const useCreateAssetsSafetyLockOutTagOut = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => createAssetsSafetyLockOutTagOut({ id, data, ...mutationProps }),
    ...config,
  })
}

export { createAssetsSafetyLockOutTagOut, useCreateAssetsSafetyLockOutTagOut }
