import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteAssetsSafetyLockOutTagOut = async ({ id, data, signal }) => {
  return await axios.delete(`/assets/${id}/tag-lock`, { data: data, signal })
}

const useDeleteAssetsSafetyLockOutTagOut = (props) => {
  return useMutation({
    mutationFn: deleteAssetsSafetyLockOutTagOut,
    ...props?.config,
  })
}

export { deleteAssetsSafetyLockOutTagOut, useDeleteAssetsSafetyLockOutTagOut }
