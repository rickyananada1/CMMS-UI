import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getMeterGroup = async ({ id, params, signal }) => {
  return await axios.get('/meter-groups/' + id, { params, signal })
}

const useGetMeterGroup = (props) => {
  return useMutation({
    mutationFn: getMeterGroup,
    ...props?.config,
  })
}

export { getMeterGroup, useGetMeterGroup }
