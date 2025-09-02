import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteLocationSafetyLockOutTagOut = async ({ id, data, signal }) => {
  return await axios.delete(`/locations/${id}/tag-lock`, { data: data, signal })
}

const useDeleteLocationSafetyLockOutTagOut = (props) => {
  return useMutation({
    mutationFn: deleteLocationSafetyLockOutTagOut,
    ...props?.config,
  })
}

export { deleteLocationSafetyLockOutTagOut, useDeleteLocationSafetyLockOutTagOut }
