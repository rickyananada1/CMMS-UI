import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getAssetChart = async ({ params, signal }) => {
  return await axios.get(`/dashboard/assets/stats`, {
    params,
    signal,
  })
}

const useGetAssetChart = (props) => {
  return useMutation({
    mutationFn: getAssetChart,
    ...props?.config,
  })
}

export { getAssetChart, useGetAssetChart }
