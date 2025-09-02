import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateMeterGroup = async ({ id, data, signal }) => {
  return await axios.put('/meter-groups/' + id, data, { signal })
}

const useUpdateMeterGroup = (props) => {
  return useMutation({
    mutationFn: updateMeterGroup,
    ...props?.config,
  })
}

export { updateMeterGroup, useUpdateMeterGroup }
