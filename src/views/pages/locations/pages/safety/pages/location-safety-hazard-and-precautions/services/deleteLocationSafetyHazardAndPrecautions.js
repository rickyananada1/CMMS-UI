import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteLocationSafetyHazardAndPrecautions = async ({ id, data, params, signal }) => {
  return await axios.delete(`/locations/${id}/hazard-precaution`, { data, params, signal })
}

const useDeleteLocationSafetyHazardAndPrecautions = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      deleteLocationSafetyHazardAndPrecautions({ id, data, ...mutationProps }),
    ...config,
  })
}

export { deleteLocationSafetyHazardAndPrecautions, useDeleteLocationSafetyHazardAndPrecautions }
