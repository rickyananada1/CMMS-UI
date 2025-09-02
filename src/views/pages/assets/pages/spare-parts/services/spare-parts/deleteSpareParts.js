import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteSpareParts = async ({ data, id, signal }) => {
  return await axios.delete(`/asset/sparepart/${id}`, { data: data, signal })
}

const useDeleteSpareParts = (props) => {
  return useMutation({
    mutationFn: deleteSpareParts,
    ...props?.config,
  })
}

export { deleteSpareParts, useDeleteSpareParts }
