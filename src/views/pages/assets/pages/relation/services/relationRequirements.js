import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'
import { getAssets } from '../../list/services'

const getAssetsWithRelation = async ({ id, params, signal }) => {
  return await axios.get(`/asset/relation/${id}/target`, { params, signal })
}

const getLocationDropdown = async ({ params, signal }) => {
  return await axios.get(`/location`, { params, signal })
}

const useLocationDropdown = (props) => {
  return useMutation({
    mutationFn: getLocationDropdown,
    ...props?.config,
  })
}

const useAssetDropdown = (props) => {
  return useMutation({
    mutationFn: getAssets,
    ...props?.config,
  })
}

const useAssetWithRelationDropdown = (props) => {
  return useMutation({
    mutationFn: getAssetsWithRelation,
    ...props?.config,
  })
}

export { useLocationDropdown, useAssetDropdown, useAssetWithRelationDropdown }
