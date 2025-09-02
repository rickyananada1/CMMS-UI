import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateAssetMeter = async ({ id, data, signal }) => {
  return await axios.put('/asset-meter/' + id, data, { signal })
}

const useUpdateAssetMeter = (props) => {
  return useMutation({
    mutationFn: updateAssetMeter,
    ...props?.config,
  })
}

export { updateAssetMeter, useUpdateAssetMeter }
