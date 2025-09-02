import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteLocationAssets = async ({ id, params, signal }) => {
  return await axios.delete(`/location/${id}/assets/` + id, { params, signal })
}

const useDeleteLocationAssets = (props) => {
  return useMutation({
    mutationFn: deleteLocationAssets,
    ...props?.config,
  })
}

export { deleteLocationAssets, useDeleteLocationAssets }
