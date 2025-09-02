import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getSparePartsOption = async ({ params, signal }) => {
  return await axios.get('/sparepart', { params, signal })
}

const useGetSparePartsOption = (props) => {
  return useMutation({
    mutationFn: getSparePartsOption,
    ...props?.config,
  })
}

export { getSparePartsOption, useGetSparePartsOption }
