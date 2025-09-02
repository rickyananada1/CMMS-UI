import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getAssetMeter = async ({ id, params, signal }) => {
  return await axios.get('/asset-meter/' + id, { params, signal })
}

const useGetAssetMeter = (props) => {
  return useMutation({
    mutationFn: getAssetMeter,
    ...props?.config,
  })
}

export { getAssetMeter, useGetAssetMeter }
