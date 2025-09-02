import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getFailureCodesRemedies = async ({ id, params, signal }) => {
  return await axios.get(`/failure_code/cause/${id}/remedy`, { params, signal })
}

const useGetFailureCodesRemediesTableList = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'failure_code_remedies_list',
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getFailureCodesRemedies({ id, params, signal }),
  })
}

const getDetailFailureCodeRemedies = async ({ id, params, signal }) => {
  return await axios.get(`/failure_code/${id}?type=remedy`, { params, signal })
}

const useGetDetailFailureCodeRemedies = ({ id, params, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => getDetailFailureCodeRemedies({ id, params, ...mutationProps }),
    ...config,
  })
}

export {
  getFailureCodesRemedies,
  useGetFailureCodesRemediesTableList,
  getDetailFailureCodeRemedies,
  useGetDetailFailureCodeRemedies,
}
