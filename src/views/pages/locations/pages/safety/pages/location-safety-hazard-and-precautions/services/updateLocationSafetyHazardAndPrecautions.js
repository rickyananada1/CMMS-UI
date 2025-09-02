import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const updateLocationSafetyHazardAndPrecautions = async ({ id, data, signal }) => {
  return await axios.put(`/locations/${id}/hazard-precaution`, data, { signal })
}

const useUpdateLocationSafetyHazardAndPrecautions = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      updateLocationSafetyHazardAndPrecautions({ id, data, ...mutationProps }),
    ...config,
  })
}

export { updateLocationSafetyHazardAndPrecautions, useUpdateLocationSafetyHazardAndPrecautions }
