import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getSubassembliesOption = async ({ params, signal }) => {
  return await axios.get('/assets/subassemblies/0', { params, signal })
}

const useGetSubassembliesOption = (props) => {
  return useMutation({
    mutationFn: getSubassembliesOption,
    ...props?.config,
  })
}

export { getSubassembliesOption, useGetSubassembliesOption }
