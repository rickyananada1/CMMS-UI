import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteSubassemblies = async ({ id, data, signal }) => {
  return await axios.delete(`/assets/subassemblies/${id}`, { data: data, signal })
}

const useDeleteSubassemblies = (props) => {
  return useMutation({
    mutationFn: deleteSubassemblies,
    ...props?.config,
  })
}

export { deleteSubassemblies, useDeleteSubassemblies }
