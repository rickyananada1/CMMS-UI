import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateLocationSafetyHazardousMaterials = async ({ id, data, signal }) => {
  return await axios.put(`/locations/${id}/hazard-material`, data, { signal })
}

const useUpdateLocationSafetyHazardousMaterials = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      updateLocationSafetyHazardousMaterials({ id, data, ...mutationProps }),
    ...config,
  })
}

export { updateLocationSafetyHazardousMaterials, useUpdateLocationSafetyHazardousMaterials }
