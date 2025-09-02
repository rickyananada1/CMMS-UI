import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getListRelationships = async ({ params, signal }) => {
  return await axios.get('/asset/relation', { params, signal })
}

const useGetListRelationships = (props) => {
  return useMutation({
    mutationFn: getListRelationships,
    ...props?.config,
  })
}

const getRelationship = async ({ id, params, signal }) => {
  return await axios.get('/asset/relation/' + id, { params, signal })
}

const useGetRelationship = (props) => {
  return useMutation({
    mutationFn: getRelationship,
    ...props?.config,
  })
}

export { getRelationship, useGetRelationship, getListRelationships, useGetListRelationships }
