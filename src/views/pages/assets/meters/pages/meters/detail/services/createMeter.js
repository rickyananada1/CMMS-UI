import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createMeter = async ({ data, signal }) => {
  return await axios.post('/meters/create', data, { signal })
}

const useCreateMeter = (props) => {
  return useMutation({
    mutationFn: createMeter,
    ...props?.config,
  })
}

export { createMeter, useCreateMeter }
