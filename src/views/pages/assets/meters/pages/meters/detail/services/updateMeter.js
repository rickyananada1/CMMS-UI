import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateMeter = async ({ id, data, signal }) => {
  return await axios.put('/meters/' + id, data, { signal })
}

const useUpdateMeter = (props) => {
  return useMutation({
    mutationFn: updateMeter,
    ...props?.config,
  })
}

export { updateMeter, useUpdateMeter }
