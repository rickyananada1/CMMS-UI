import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteAssetMeter = async ({ id, params, signal }) => {
  return await axios.delete('/asset-meter/' + id, { params, signal })
}

const useDeleteAssetMeter = (props) => {
  return useMutation({
    mutationFn: deleteAssetMeter,
    ...props?.config,
  })
}

export { deleteAssetMeter, useDeleteAssetMeter }
