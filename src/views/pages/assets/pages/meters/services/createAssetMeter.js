import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createAssetMeter = async ({ data, signal }) => {
  return await axios.post('/asset-meter/multiple', data, { signal })
}

const useCreateAssetMeter = (props) => {
  return useMutation({
    mutationFn: createAssetMeter,
    ...props?.config,
  })
}

export { createAssetMeter, useCreateAssetMeter }
