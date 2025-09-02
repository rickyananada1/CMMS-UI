import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteLocationSafetyHazardousMaterials = async ({ id, data, params, signal }) => {
  return await axios.delete(`/locations/${id}/hazard-material`, { data, params, signal })
}

const useDeleteLocationSafetyHazardousMaterials = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      deleteLocationSafetyHazardousMaterials({ id, data, ...mutationProps }),
    ...config,
  })
}

export { deleteLocationSafetyHazardousMaterials, useDeleteLocationSafetyHazardousMaterials }
