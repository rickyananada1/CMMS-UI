import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getAssetDetail = async ({ id, params, signal }) => {
  return await axios.get(`/assets/${id}`, { params, signal })
}

const useGetAssetDetail = (props) => {
  return useMutation({
    mutationFn: getAssetDetail,
    ...props?.config,
  })
}

export { getAssetDetail, useGetAssetDetail }
