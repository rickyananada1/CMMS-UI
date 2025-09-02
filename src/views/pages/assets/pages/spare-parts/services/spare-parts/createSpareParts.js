import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createSpareParts = async ({ data, id, signal }) => {
  return await axios.post(`/asset/sparepart/${id}`, { data: data, signal })
}

const useCreateSpareParts = (props) => {
  return useMutation({
    mutationFn: createSpareParts,
    ...props?.config,
  })
}

export { createSpareParts, useCreateSpareParts }
