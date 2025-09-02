import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateSpareParts = async ({ id, data, signal }) => {
  return await axios.put(`/asset/sparepart/${id}`, { data: data, signal })
}

const useUpdateSpareParts = (props) => {
  return useMutation({
    mutationFn: updateSpareParts,
    ...props?.config,
  })
}

export { updateSpareParts, useUpdateSpareParts }
