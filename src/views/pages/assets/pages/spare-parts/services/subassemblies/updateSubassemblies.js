import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateSubassemblies = async ({ data, signal }) => {
  return await axios.put('/assets/subassemblies', { data: data, signal })
}

const useUpdateSubassemblies = (props) => {
  return useMutation({
    mutationFn: updateSubassemblies,
    ...props?.config,
  })
}

export { updateSubassemblies, useUpdateSubassemblies }
