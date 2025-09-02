import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createLocationSafetyLockOutTagOut = async ({ id, data, signal }) => {
  return await axios.post(`/locations/${id}/lock-out`, data, { signal })
}

const useCreateLocationSafetyLockOutTagOut = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      createLocationSafetyLockOutTagOut({ id, data, ...mutationProps }),
    ...config,
  })
}

export { createLocationSafetyLockOutTagOut, useCreateLocationSafetyLockOutTagOut }
