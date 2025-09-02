import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateLocationSafetyLockOutTagOut = async ({ id, data, signal }) => {
  return await axios.put(`/locations/${id}/tag-lock`, data, { signal })
}

const useUpdateLocationSafetyLockOutTagOut = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      updateLocationSafetyLockOutTagOut({ id, data, ...mutationProps }),
    ...config,
  })
}

export { updateLocationSafetyLockOutTagOut, useUpdateLocationSafetyLockOutTagOut }
