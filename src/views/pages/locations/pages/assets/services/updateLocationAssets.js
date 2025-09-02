import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateLocationAssets = async ({ id, asset_id, data, signal }) => {
  return await axios.put(`/location/${id}/assets/${asset_id}`, data, { signal })
}

const useUpdateLocationAssets = (props) => {
  return useMutation({
    mutationFn: updateLocationAssets,
    ...props?.config,
  })
}

export { updateLocationAssets, useUpdateLocationAssets }
