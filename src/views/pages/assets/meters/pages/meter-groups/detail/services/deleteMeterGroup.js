import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteMeterGroup = async ({ id, params, signal }) => {
  return await axios.delete('/meter-groups/' + id, { params, signal })
}

const useDeleteMeterGroup = (props) => {
  return useMutation({
    mutationFn: deleteMeterGroup,
    ...props?.config,
  })
}

const deleteMeterInGroup = async ({ id, data, signal }) => {
  return await axios.delete(`/meter-groups/${id}/meters`, { data: data, signal })
}

const useDeleteMeterInGroup = (props) => {
  return useMutation({
    mutationFn: deleteMeterInGroup,
    ...props?.config,
  })
}

export { deleteMeterGroup, useDeleteMeterGroup, useDeleteMeterInGroup }
