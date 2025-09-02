import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getRelation = async ({ id, params, signal }) => {
  return await axios.get(`/assets/${id}/relation`, { params, signal })
}

const useGetRelation = (props) => {
  return useMutation({
    mutationFn: getRelation,
    ...props?.config,
  })
}

const useGetRelationDropdown = ({ id, config, params } = {}) => {
  return useMutation({
    mutationFn: (mutationProps) => getRelation({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetListRelation = ({ id, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'relation-by-assetsId',
      id,
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getRelation({ id, params, signal }),
  })
}

export { getRelation, useGetRelation, useGetRelationDropdown, useGetListRelation }
