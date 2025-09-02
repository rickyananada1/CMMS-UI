import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createMeterGroup = async ({ data, signal }) => {
  return await axios.post('/meter-groups/create', data, { signal })
}

const useCreateMeterGroup = (props) => {
  return useMutation({
    mutationFn: createMeterGroup,
    ...props?.config,
  })
}

export { createMeterGroup, useCreateMeterGroup }
