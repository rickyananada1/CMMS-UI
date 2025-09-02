import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getFrequencySeasonalList = async ({ id, params, signal }) => {
  return await axios.get(`/preventive-maintenance/${id}/frequency/history`, { id, params, signal })
}

const useGetFrequencySeasonalList = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'frequency-seasonal-history',
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getFrequencySeasonalList({ id, params, signal }),
  })
}

const getFrequencySeasonalDetail = async ({ id, params, signal }) => {
  return await axios.get(`/preventive-maintenance/${id}/frequency`, { params, signal })
}

const useGetFrequencySeasonalDetail = (props) => {
  return useMutation({
    mutationFn: getFrequencySeasonalDetail,
    ...props?.config,
  })
}

export { getFrequencySeasonalList, useGetFrequencySeasonalList, useGetFrequencySeasonalDetail }
